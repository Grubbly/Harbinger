import express from 'express';
import akashService from '../services/akash.service';
import debug from 'debug';

const log: debug.IDebugger = debug('app:akash-middleware');

class AkashMiddleware {
    async validateNoInvalidCharacters(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const invalidCharacters: Array<String> = [
            '&',';'
        ];

        // Do character check here
        const reqCommandContainsInvalidCharacters: boolean = req.body.command;

        if(reqCommandContainsInvalidCharacters) {
            res.status(400).send({
                error: `Invalid character found in command, commands cannot contain: ${invalidCharacters}`
            });
        } else {
            next();
        }
    }
}