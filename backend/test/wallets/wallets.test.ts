import supertest, { SuperAgentTest } from 'supertest';
import { expect } from 'chai';
import shortid from 'shortid';
import { Wallet } from '../../wallets/entities/wallets.entity';
import { Connection, getConnection } from 'typeorm'
import init from '../../app';
import express from 'express';
import * as http from 'http';

// Variables for modifying API data

// This is used in first POST test after wallet is created
let firstWalletIdTest = '';
let dbConnection: Connection;
let app: express.Application;
let server: http.Server;

const firstWalletBody = {
    email: `test+${shortid.generate()}@test.com`,
    password: `coolpassword_man`
};
const newFirstName = 'Tristan';
const newFirstName2 = 'Pippy';
const newLastName2 = 'Taylor';

describe('when accessing wallets endpoints the API', function() {
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
            getConnection().close()
            .then(() => {
                done();
            })
        })
    });

    // This test sets the database connection for the rest of the tests.
    it('should connect to the database', function() {
        dbConnection = getConnection();

        expect(dbConnection).to.not.be.an("undefined");
        expect(dbConnection).to.not.be.a("void");
        expect(dbConnection).to.be.an('object');
        expect(dbConnection.isConnected).to.equal(true);    
    });

    it('should have database correctly configured', function() {
        expect(dbConnection.name).to.be.a('string');
        expect(dbConnection.name).to.equal('default');
        expect(dbConnection.options.type).to.equal('sqlite');  
    });

    describe('without authentication or authorization the API', function() {

        // Test creating a wallet with a unique email.
        it('should allow a POST to /wallets', async function() {
            const res = await request.post('/wallets').send(firstWalletBody);
    
            expect(res.status).to.equal(201);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.be.a('string');
            firstWalletIdTest = res.body.id;
        });
    
        it('should allow a GET from /wallets', async function() {
            const res = await request.get('/wallets').send();
    
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('array');
            expect(res.body.length).to.exist;
            expect(res.body.length).to.be.greaterThanOrEqual(1);
        });
    
        it('should allow a GET from /wallet/:walletId', async function() {
            const res = await request.get(`/wallets/${firstWalletIdTest}`).send();
    
            expect(res.status).to.equal(200);
            expect(res.body).not.to.be.empty;
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.be.a('string');
            expect(res.body.id).to.equal(firstWalletIdTest);
            expect(res.body.email).to.equal(firstWalletBody.email);
        });
    
        it('should allow a PATCH to /wallets/:walletId', async function () {
            const res = await request
                .patch(`/wallets/${firstWalletIdTest}`)
                .send({
                    firstName: newFirstName,
                });
            expect(res.status).to.equal(204);
        });

        it('should allow a PUT to /wallets/:walletId with a valid ID', async function () {
            const res = await request
                .put(`/wallets/${firstWalletIdTest}`)
                .send({
                    email: firstWalletBody.email,
                    password: firstWalletBody.password,
                    firstName: newFirstName2,
                    lastName: newLastName2,
                    permissionFlags: 256,
                });
            expect(res.status).to.equal(204);
        });
    
        it('should disallow a PUT to /wallets/:walletId with a nonexistent ID', async function () {
            const res = await request
                .put(`/wallets/i-do-not-exist`)
                .send({
                    email: firstWalletBody.email,
                    password: firstWalletBody.password,
                    firstName: 'Test',
                    lastName: 'Van Test',
                    permissionFlags: 256,
                });
            expect(res.status).to.equal(404);
        });
    });
});