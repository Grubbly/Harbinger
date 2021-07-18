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
        log(`Got ${results}`);
        const jsonifiedWallets = JSON.parse(results.stdout);
        res.status(200).send(jsonifiedWallets);
    }

    async getWalletByName(req: express.Request, res: express.Response) {
        const results = await akashService.getWalletByName(req.body.walletName);
        const jsonifiedWallet = JSON.parse(results.stdout);
        res.status(200).send(jsonifiedWallet);
    }

    async deleteWalletByName(req: express.Request, res: express.Response) {
        await akashService.deleteWalletByName(req.body.walletName);
        res.status(204).send();
    }

    async importWalletByMnemonic(req: express.Request, res: express.Response) {
        const results = await akashService.importWalletByMnemonic(req.body.walletName, req.body.mnemonic);
        const jsonifiedWalletImportDetails = JSON.parse(results.stdout);
        res.status(201).send(jsonifiedWalletImportDetails);
    }

    // TODO: needs testing
    async getWalletBalanceByAddress(req: express.Request, res: express.Response) {
        const walletAddress: string = req.query.address as string;
        const node: string = req.query.node as string;

        const results = await akashService.getWalletBalanceByAddress(walletAddress, node);
        const jsonifiedWalletBalanceDetails = JSON.parse(results.stdout);
        res.status(200).send(jsonifiedWalletBalanceDetails);
    }

    // TODO: needs testing
    async createCertificate(req: express.Request, res: express.Response) {
        const akashChainId = req.body.akashChainId;
        const akashKeyringBackend = req.body.akashKeyringBackend;
        const akashKeyName = req.body.akashKeyName;
        const akashNode = req.body.akashNode;
        const feeInUAKT = req.body.feeInUAKT;

        log(`Got Certificate Create with req.body: ${req.body}`);

        const results = await akashService.createCertificate(
            akashChainId,
            akashKeyringBackend,
            akashKeyName,
            akashNode,
            feeInUAKT
        );

        const jsonifiedCertDetails = JSON.parse(results.stdout);
        res.status(201).send(jsonifiedCertDetails);
    }
}

export default new AkashController();