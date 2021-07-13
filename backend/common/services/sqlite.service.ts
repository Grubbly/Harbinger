import { Connection, createConnection } from 'typeorm';
import debug from 'debug';
import appRoot from 'app-root-path';
import path from 'path';
import { Wallet } from '../../wallets/entities/wallets.entity';

const log: debug.IDebugger = debug('app:typeorm-sqlite-service');

class SqliteService {
    private count: number = 0;
    private dbName: string = 'app-database.sqlite';

    constructor() {
        log("SqliteService has been constructed");
    }

    async connectWithRetry(): Promise<any> {
        log('Attempting to connect to sqlite with retry');
        const dbFilePath: string = path.join(appRoot.toString(), 'db', this.dbName);
        log('db path: ', dbFilePath);

        // Create a new connection to the file based sqlite database
        // and store that connection in the typeorm connection manager.
        return await createConnection({
            type: "sqlite",
            name: "default",
            database: dbFilePath,
            logging: true,
            logger: "debug",
            entities: [Wallet],
            synchronize: true
        })
        .then((connection) => {
            // Successful database connection
            log("TypeORM successfully connected to SQLite");
        })
        .catch((error) => {
            // If we failed to open sqlite database with typeorm, retry
            const retrySeconds: number = 5;
            log(`Unable to open sqlite database, retrying in ${retrySeconds*1000} seconds. (Attempt #${++this.count})`);
            log(error);
            setTimeout(this.connectWithRetry, retrySeconds * 1000);
        });
    }
}

export default new SqliteService();