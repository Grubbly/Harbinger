import { CommonRoutesConfig } from "../common/common.routes.config";
import akashController from "./controllers/akash.controller";
import express from 'express';

// Data validation
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from "express-validator";
import akashMiddleware from "./middleware/akash.middleware";

export class AkashRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'AkashRoutes');
    }

    configureRoutes(): express.Application {
        this.app.route('/akash')
            .post(
                // must not contain ; or &
                body('command').isString().notEmpty()
                    .withMessage("Command is empty or not a string"),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                akashMiddleware.validateNoInvalidCharacters,
                akashController.runRawCommand
            );

        return this.app;
    }
}