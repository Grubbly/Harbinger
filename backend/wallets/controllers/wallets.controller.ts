// REST API controller for wallet operations.

// This class is responsible for handling what
// the requests want to do by pairing them
// with their walletService counterparts.

import express from 'express';
import walletsService from '../services/wallets.service';
import debug from 'debug';

// Hashing
import argon2 from 'argon2';

const log: debug.IDebugger = debug('app:wallets-controller');

class WalletsController {
    async listWallets(req: express.Request, res: express.Response) {
        const wallets = await walletsService.list(100, 0);
        res.status(200).send(wallets);
    }

    async getWalletById(req: express.Request, res: express.Response) {
        const wallet = await walletsService.readById(req.body.id);
        res.status(200).send(wallet);
    }

    async createWallet(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        const walletId = await walletsService.create(req.body);
        res.status(201).send({ id: walletId });
    }

    async patch(req: express.Request, res: express.Response) {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await walletsService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    async put(req: express.Request, res: express.Response) {
        req.body.password = await argon2.hash(req.body.password);
        log(await walletsService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    async removeWallet(req: express.Request, res: express.Response) {
        log(await walletsService.deleteById(req.body.id));
        res.status(204).send();
    }
}

export default new WalletsController();