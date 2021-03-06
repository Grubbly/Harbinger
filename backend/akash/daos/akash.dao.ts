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
        let command = `akash keys add ${commandFields.walletName}`;
        
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
        const command = `akash keys show ${walletName} --output json`;
        return await ExecPromiseService.exec(command);
    }

    async deleteWalletByName(walletName: string) {
        const command = `akash keys delete ${walletName} --yes --output json`;
        return await ExecPromiseService.exec(command);
    }

    async importWalletByMnemonic(walletName: string, mnemonic: string) {
        const command = `akash keys add ${walletName} --recover --output json`;
        return await ExecPromiseService.execWithStdin(command, mnemonic);
    }

    // TODO: needs testing
    async getWalletBalanceByAddress(walletAddress: string, node: string) {
        const command = `akash query bank balances --node ${node} ${walletAddress} --output json`;
        return await ExecPromiseService.exec(command);
    }

    // TODO: needs testing
    async createCertificate(
        akashChainId: string,
        akashKeyringBackend: string,
        akashKeyName: string,
        akashNode: string,
        feeInUAKT: string
    ) {
        const command = `akash tx cert create client --chain-id ${akashChainId.replace('\n','')} --keyring-backend ${akashKeyringBackend} --from ${akashKeyName} --node ${akashNode} --fees ${feeInUAKT}uakt`;

        return await ExecPromiseService.exec(command);
    }
}

export default new AkashDao();