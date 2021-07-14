import { PostRawCommandDto } from '../dto/post.raw.command.dto';
import debug from 'debug';
import ExecPromise from '../../common/helpers/helper.exec.promise';
import { PostKeysAddDto } from '../dto/post.keys.add.dto';

const log: debug.IDebugger = debug('app:akash-dao');

class AkashDao {
    constructor() {
        log('Created new instance of AkashDao');
    }

    // Helper wrapper around ExecPromise.exec that includes
    // try catch error handling.
    private async exec(command: string) {
        try {
            const results = await ExecPromise.exec(command);    
            return results;
        } 
        catch(error) {
            log(`Executing command resulted in error: ${error}`);
            return error;
        }
    }

    async postRawCommand(commandFields: PostRawCommandDto) {
        const command = `akash ${commandFields.command}`;
        log(`Running raw command: ${command}`);
        
        return this.exec(command);
    }

    async createWallet(commandFields: PostKeysAddDto) {
        // Formulate base command with required fields
        let command = `akash keys add ${commandFields.name}`;
        
        // Apply flags
        commandFields.flags.map((flag) => {
            command += ` ${flag} `;
        });

        // Receive output as json for easy parsing
        command += ` --output json `;

        log(`Running akash keys add command: ${command}`);
        return this.exec(command);
    }

    async getWallets() {
        const command = `akash keys show --output json`;
        return this.exec(command);
    }

    async getWalletByName(walletName: string) {
        const command = `akash keys show ${walletName} --output json`
        return this.exec(command);
    }
}

export default new AkashDao();