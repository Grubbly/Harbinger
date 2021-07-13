// Server
import express from 'express';
import * as http from 'http';

// TypeORM SQLite Database
import sqliteService from './common/services/sqlite.service';

// Logging
import * as winston from 'winston';
import * as expressWinston from 'express-winston';

// Middleware
import cors from 'cors';

// Routes
import { CommonRoutesConfig } from './common/common.routes.config';
import { WalletsRoutes } from './wallets/wallets.routes.config';

// Debugging
import debug from 'debug';

// Function decorator capability
import "reflect-metadata";
import { AkashRoutes } from './akash/akash.routes.config';

 // Variables
 const app: express.Application = express();
 const server: http.Server = http.createServer(app);
 const port: number = 3000;
 const routes: Array<CommonRoutesConfig> = [];
 const debugLog: debug.IDebugger = debug('app');

const init = sqliteService.connectWithRetry()
.then(async () => {
    // Parse all incoming requests as json
    app.use(express.json());

    // Allow cross-origin requests
    app.use(cors());

    // Configure expressWinston to log all HTTP requests
    const loggerOptions: expressWinston.LoggerOptions = {
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(), // use json formatting
            winston.format.prettyPrint(), // better readability
            winston.format.colorize({ all: true }) // enable coloring
        )
    };

    // Condense logging when running app in production mode
    if(!process.env.DEBUG) {
        // enable single line logging
        loggerOptions.meta = false;
        
        // Squelch winston for test runs
        if(typeof global.it === 'function') {
            loggerOptions.level = 'http';
        }
    }

    // Initialize logger
    app.use(expressWinston.logger(loggerOptions));
            
    // Initialize routes using the configured app
    const walletRoutes: WalletsRoutes = new WalletsRoutes(app);
    const akashRoutes: AkashRoutes = new AkashRoutes(app);

    // Populate the routes array
    routes.push(walletRoutes);
    routes.push(akashRoutes);

    // Test routes
    const testMessage: String = `Server running at localhost:${port}`;
    app.get('/', (req: express.Request, res: express.Response) => {
        res.status(200).send(testMessage);
    });

    server.listen(port, () => {
        routes.forEach((route: CommonRoutesConfig) => {
            debugLog(`Routes configured for ${route.getName()}`);
        });
    
        console.log(`Server started at http://localhost:${port}`);
    });

    return {app, server};
})
.catch((err) => {
    console.log("Unable to initialize", err);
    process.exit(1);
});

export default init;