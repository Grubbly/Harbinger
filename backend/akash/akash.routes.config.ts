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
        this.app.param('walletName', akashMiddleware.extractWalletName);

        this.app.route('/akash')
            .post(
                // must not contain ; or &
                body('command').isString().notEmpty()
                    .withMessage("Command is empty or not a string"),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                akashMiddleware.validateNoInvalidCharactersInCommand, // TODO: replace me
                akashController.runRawCommand
            );

        this.app.route('/akash/keys')
            .post(
                // TODO: Change invalid character checks to inline here
                body('walletName').isString().notEmpty()
                    .withMessage("Name cannot be empty or contain & or ;"),
                body('flags').isArray()
                    .withMessage("If no flags, make sure to include flags: [] in request body (ie set flags equal to empty array)."),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                akashMiddleware.validateNoInvalidCharactersInName, // TODO: replace me
                akashMiddleware.validateNoInvalidCharactersInFlags, // TODO: replace me
                akashMiddleware.validateSameWalletDoesntExist,
                akashController.createWallet
            )
            .get(akashController.getWallets)

        this.app.route('/akash/keys/:walletName')
            .all(akashMiddleware.validateWalletExists)
            .get(akashController.getWalletByName)

        return this.app;
    }
}