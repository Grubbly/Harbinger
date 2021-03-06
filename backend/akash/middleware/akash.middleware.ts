import express from 'express';
import debug from 'debug';
import ExecPromiseService from '../../common/services/exec.service';

const log: debug.IDebugger = debug('app:akash-middleware');

class AkashMiddleware {

    async extractWalletName(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        req.body.walletName = req.params.walletName;
        next();
    }

    async validateNoInvalidCharactersInCommand(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const invalidCharacters: Array<string> = [
            '&',';'
        ];

        // Innocent before proven guilty :P
        let reqCommandContainsValidCharacters: boolean = true;

        // Check if the command contains invalid characters
        invalidCharacters.forEach((character: string) => {
            if(req.body.command.includes(character)) {
                reqCommandContainsValidCharacters = false;
                return;
            }
        });

        if(reqCommandContainsValidCharacters) {
            next();
        } else {
            res.status(400).send({
                error: `Invalid character found in command, commands cannot contain: ${invalidCharacters}`
            });
        }
    }

    async validateNoInvalidCharactersInFlags(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const invalidCharacters: Array<string> = [
            '&',';'
        ];

        // Innocent before proven guilty :P
        let reqFlagsContainsValidCharacters: boolean = true;

        // Check if the flags contain invalid characters
        req.body.flags.forEach((flag: string) => {
            invalidCharacters.forEach((character: string) => {
                if(flag.includes(character)) {
                    reqFlagsContainsValidCharacters = false;
                    return;
                }
            });
        });

        if(reqFlagsContainsValidCharacters) {
            next();
        } else {
            res.status(400).send({
                error: `Invalid character found in flags, flags cannot contain: ${invalidCharacters}`
            });
        }
    }

    async validateNoInvalidCharactersInName(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const invalidCharacters: Array<string> = [
            '&',';'
        ];

        // Innocent before proven guilty :P
        let reqNameContainsValidCharacters: boolean = true;

        // Check if the name contains invalid characters
        invalidCharacters.forEach((character: string) => {
            if(req.body.walletName.includes(character)) {
                reqNameContainsValidCharacters = false;
                return;
            }
        });

        if(reqNameContainsValidCharacters) {
            next();
        } else {
            res.status(400).send({
                error: `Invalid character found in name, names cannot contain: ${invalidCharacters}`
            });
        }
    }

    async validateWalletExists(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const results = await ExecPromiseService.exec(`akash keys show ${req.body.walletName} --output json`);
    
        if(!results.stderr) {
            next();
        } else {
            res.status(404).send({
                error: `Could not find wallet named ${req.body.walletName} on this device`
            });
        }
    }

    async validateSameWalletDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction   
    ) {
        const results = await ExecPromiseService.exec(`akash keys show ${req.body.walletName}`);

        // If we get an error from the wallet not existing, continue to create the wallet
        if(results.stderr) {
            next();
        } else {
            res.status(400).send({
                error: 'Wallet with that name already exists on this device.'
            })
        }
    }

    async validatePublicKeyDoesntExist(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) { 
        const pubKeyRequest = await ExecPromiseService.execWithStdin(
            `akash keys add ${req.body.walletName} --recover --dry-run --output json`,
            req.body.mnemonic
        );
        const pubKey = JSON.parse(pubKeyRequest.stdout).address;
        log("JSON", pubKey);
        const duplicatePubKeyRequest = await ExecPromiseService.exec(
            `akash keys show ${pubKey}`
        );

        if(duplicatePubKeyRequest.stderr) {
            next();
        } else {
            res.status(400).send({
                error: 'Public key already exists on this device'
            });
        }
    }
}

export default new AkashMiddleware();