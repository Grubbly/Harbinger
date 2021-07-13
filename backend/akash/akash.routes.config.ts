import { CommonRoutesConfig } from "../common/common.routes.config";
import akashController from "./controllers/akash.controller";
import express from 'express';

// Data validation
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from "express-validator";

export class AkashRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'WalletRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/akash')
            .post(
                // must contain akash and not contain ; or &
                body('command').isString().notEmpty(),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                akashController.runRawCommand
            );

        return this.app;
    }
}