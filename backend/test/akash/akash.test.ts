// TODO: share connection with other tests

import supertest, { SuperAgentTest } from 'supertest';
import { expect } from 'chai';
import init from '../../app';
import express from 'express';
import * as http from 'http';
import shortid from 'shortid';

let app: express.Application;
let server: http.Server;

describe('when accessing akash endpoints the API', function() {
    // Emulate a client request using supertest
    let request: SuperAgentTest;

    before(async function() {
        const appData = await init;
        app = appData.app;
        server = appData.server;
        
        request = supertest.agent(app);
    });

    after((done) => {
        // Kill express and close the database connection
        // once tests are through
        server.close(() => {
            done();
        })
    });

    it('should allow POST to /akash if valid akash CLI commands are sent', async function() {
        // Note: commands are automatically prefixed with 'akash;
        // so only arguments and flag are necessary in the command
        const commandBody = {
            command: '--help'
        }
        const res = await request.post('/akash').send(commandBody);

        expect(res.status).to.equal(201);
        expect(res.body.stdout).to.be.a('string');
        expect(res.body.stderr).to.be.empty;
    });

    it('POST to /akash should not crash if an error occurs in exec', async function() {
        // Expands to 'akash akash --help' at execution, which should error out
        const commandBody = {
            command: 'akash --help'
        }
        const res = await request.post('/akash').send(commandBody);

        expect(res.status).to.equal(400);
        expect(res.body.stdout).to.be.empty;
        expect(res.body.stderr).to.be.a('string');
    });

    it('should disallow a POST to /akash if body is malformed', async function() {
        const malformedBody = {
            malformed: 'ew gross'
        }
        const res = await request.post('/akash').send(malformedBody);

        expect(res.status).to.equal(400);
    });

    it('should disallow a POST to /akash if invalid characters are in the command', async function() {
        // Unix command stringing
        const badCommand1 = {
            command: '--help ;'
        }
        // Windows command stringing
        const badCommand2 = {
            command: '--help &&'
        }

        const andRes = await request.post('/akash').send(badCommand1);
        const semiColonRes = await request.post('/akash').send(badCommand2);

        expect(andRes.status).to.equal(400);
        expect(semiColonRes.status).to.equal(400);
    });

    it('should allow a POST to /akash/keys to create a wallet', async function() {
        const createWalletBody = {
            walletName: shortid.generate(),
            flags: []
        }

        const res = await request.post('/akash/keys').send(createWalletBody);
        expect(res.status).to.equal(201);
        expect(res.body.name).to.equal(createWalletBody.walletName);
    });

    it('should disallow a POST to /akash/keys if the walletName already exits', async function() {
        const walletName = shortid.generate();
        const createWalletWithSameNameBody = {
            walletName: walletName,
            flags: []
        }

        await request.post('/akash/keys').send(createWalletWithSameNameBody);
        const resDuplicate = await request.post('/akash/keys').send(createWalletWithSameNameBody);
        
        expect(resDuplicate.status).to.equal(400);
    });

    it('should disallow a POST to /akash/keys if invalid characters are in the walletName or flags', async function() {
        const badCommand1 = {
            walletName: shortid.generate() + ';',
            flags: []
        }
        const badCommand2 = {
            walletName: shortid.generate(),
            flags: ['--help;']
        }
        const badCommand3 = {
            walletName: shortid.generate(),
            flags: ['--help &&']
        }

        const nameRes = await request.post('/akash/keys').send(badCommand1);
        const semiColonRes = await request.post('/akash/keys').send(badCommand2);
        const andRes = await request.post('/akash/keys').send(badCommand3);

        expect(nameRes.status).to.equal(400);
        expect(andRes.status).to.equal(400);
        expect(semiColonRes.status).to.equal(400);
    });

    it('should allow a GET to /akash/keys to retrieve all wallets stored on device', async function() {
        const res = await request.get('/akash/keys').send();

        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
    });

    it(`should allow a GET to /akash/keys/:walletName to retrieve wallet info`, async function() {
        const walletName = shortid.generate();
        const createWalletBody = {
            walletName: walletName,
            flags: []
        }

        await request.post('/akash/keys').send(createWalletBody);
        const res = await request.get(`/akash/keys/${walletName}`).send();

        expect(res.status).to.equal(200);
        expect(res.body.name).to.equal(walletName);
        expect(res.body).to.have.own.property('type');
        expect(res.body).to.have.own.property('pubkey');
        expect(res.body).to.have.own.property('address');
    });
});