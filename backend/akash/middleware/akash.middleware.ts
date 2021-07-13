import express from 'express';
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

        // Innocent before proven guilty :P
        let reqCommandContainsValidCharacters: boolean = true;

        // Check if the command contains invalid characters
        invalidCharacters.forEach((character) => {
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
}

export default new AkashMiddleware();