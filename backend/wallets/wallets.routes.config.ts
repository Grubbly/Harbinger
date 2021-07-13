import { CommonRoutesConfig } from "../common/common.routes.config";
import WalletsController from "./controllers/wallets.controller";
import WalletsMiddleware from "./middleware/wallets.middleware";
import express from 'express';

// Data validation 
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import { body } from 'express-validator';


export class WalletsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'WalletsRoutes');
    }

    configureRoutes(): express.Application {
        
        this.app.route('/wallets')
            .get(WalletsController.listWallets)
            .post(
                body('email').isEmail(),
                body('password')
                    .isLength({min: 7})
                    .withMessage('Must include password (7+ characters)'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                WalletsMiddleware.validateSameEmailDoesntExist,
                WalletsController.createWallet
            );

        this.app.param('walletId', WalletsMiddleware.extractWalletId);

        this.app.route('/wallets/:walletId')
            // Middleware function run before /wallets/:walletId
            .all( WalletsMiddleware.validateWalletExists )
            .get( WalletsController.getWalletById )
            .delete( WalletsController.removeWallet )
            .put([
                body('email').isEmail(),
                body('password')
                    .isLength({min: 7})
                    .withMessage('Must include password (7+ characters)'),
                body('firstName').isString(),
                body('lastName').isString(),
                body('permissionFlags').isInt(),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                WalletsMiddleware.validateSameEmailBelongsToSameWallet,
                WalletsController.put
            ])
            .patch([
                body('email').isEmail().optional(),
                body('password')
                    .isLength({min: 7})
                    .withMessage('Must include password (7+ characters)')
                    .optional(),
                body('firstName').isString().optional(),
                body('lastName').isString().optional(),
                body('permissionFlags').isInt().optional(),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                WalletsMiddleware.validatePatchEmail,
                WalletsController.patch
            ]);

        return this.app;
    }
}