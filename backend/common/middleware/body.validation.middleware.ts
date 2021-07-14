// This class is responsible for storing all errors generated
// from express-validator's body() function in the request.

import express from 'express';
import { validationResult } from 'express-validator';

class BodyValidationMiddleware {
    verifyBodyFieldsErrors(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        // Any validation errors are stored in the request
        const errors = validationResult(req);
        
        // If there are errors
        if (!errors.isEmpty()) {
            return res.status(400).send({ errors: errors.array() });
        }

        next();
    }
}

export default new BodyValidationMiddleware();
