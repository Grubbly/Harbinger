import { PostRawCommandDto } from '../dto/post.raw.command.dto';
import debug from 'debug';
import { PostKeysAddDto } from '../dto/post.keys.add.dto';
import ExecPromiseService from '../../common/services/exec.service';

const log: debug.IDebugger = debug('app:akash-dao');

class AkashDao {
    constructor() {
        log('Created new instance of AkashDao');
    }

    async postRawCommand(commandFields: PostRawCommandDto) {
        const command = `akash ${commandFields.command}`;
        log(`Running raw command: ${command}`);
        
        return await ExecPromiseService.exec(command);
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
        return await ExecPromiseService.exec(command);
    }

    async getWallets() {
        const command = `akash keys list --output json`;
        return await ExecPromiseService.exec(command);
    }

    async getWalletByName(walletName: string) {
        const command = `akash keys show ${walletName} --output json`
        return await ExecPromiseService.exec(command);
    }
}

export default new AkashDao();