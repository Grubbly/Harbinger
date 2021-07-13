import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:akash-middleware');

class AkashMiddleware {

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
}

export default new AkashMiddleware();