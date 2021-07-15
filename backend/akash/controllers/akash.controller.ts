import express from 'express';
import akashService from '../services/akash.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:akash-controller');

class AkashController {
    // Raw command sent in POST request
    // TODO: make a get version of this with URL param
    async runRawCommand(req: express.Request, res: express.Response) {
        const results = await akashService.run(req.body);
        
        if(results.stderr) {
            // Bad command was executed, send error
            res.status(400).send(results);
        }
        else {
            // Command was good, send output
            res.status(201).send(results);
        }
    }

    async createWallet(req: express.Request, res: express.Response) {
        const results = await akashService.createWallte(req.body);

        if(results.stderr) {
            // Bad command was executed, send error
            res.status(400).send(results);
        }
        else {
            // Command was good, send output
            log(`New wallet created: ${req.body.walletName}`);
            const jsonifiedStdout = JSON.parse(results.stdout);
            res.status(201).send(jsonifiedStdout);
        }
    }

    async getWallets(req: express.Request, res: express.Response) {
        const results = await akashService.getWallets();
        log(`got ${results}`)
        const jsonifiedWallets = JSON.parse(results.stdout);
        res.status(200).send(jsonifiedWallets);
    }

    async getWalletByName(req: express.Request, res: express.Response) {
        const results = await akashService.getWalletByName(req.body.walletName);
        const jsonifiedWallet = JSON.parse(results.stdout);
        res.status(200).send(jsonifiedWallet);
    }

    async deleteWalletByName(req: express.Request, res: express.Response) {
        const results = await akashService.deleteWalletByName(req.body.walletName);
        res.status(204).send();
    }
}

export default new AkashController();