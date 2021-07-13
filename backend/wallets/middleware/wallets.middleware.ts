import express from 'express'
import walletsService from '../services/wallets.service'
import debug from 'debug'

const log: debug.IDebugger = debug('app:wallets-controller');
class WalletsMiddleware {
    async validateRequiredWalletBodyFields(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const reqContainsRequiredFields: boolean = req.body && req.body.email && req.body.password;
        if(reqContainsRequiredFields) {
            next();
        } else {
            res.status(400).send({
                error: `Missing required fields: email or password`
            });
        }
    }

    async validateSameEmailDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const wallet = await walletsService.getWalletByEmail(req.body.email);
        if(wallet) {
            res.status(400).send({
                error: `Wallet email already exists`
            });
        } else {
            next();
        }
    }

    async validateSameEmailBelongsToSameWallet(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const wallet = await walletsService.getWalletByEmail(req.body.email);
        if(wallet && wallet.id === req.params.walletId) {
            next();
        } else {
            res.status(400).send({ error: `Invalid email` });
        }
    }

    // Needed since email is primary key
    validatePatchEmail = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        if(req.body.email) {
            log('Validating email', req.body.email);
            this.validateSameEmailBelongsToSameWallet(req, res, next);
        } else {
            next();
        }
    };

    async validateWalletExists (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const wallet = await walletsService.readById(req.params.walletId);
        if(wallet) {
            next();
        } else {
            res.status(404).send({
                error: `Wallet ${req.params.walletId} not found`
            });
        }
    }

    async extractWalletId(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.id = req.params.walletId;
        next();
    }
}

export default new WalletsMiddleware();