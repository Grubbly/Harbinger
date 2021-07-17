import debug from "debug";
import akashDao from "../daos/akash.dao";
import { PostKeysAddDto } from "../dto/post.keys.add.dto";
import { PostRawCommandDto } from "../dto/post.raw.command.dto";

const log: debug.IDebugger = debug('app:akash-base')

class AkashService {
    private platform: string;

    constructor() {
        // TODO: code a smart way to detect this
        this.platform = 'windows';
    }

    async run(rawCommandFields: PostRawCommandDto) {
        return akashDao.postRawCommand(rawCommandFields);
    }

    async createWallte(addWalletFields: PostKeysAddDto) {
        return akashDao.createWallet(addWalletFields);
    }

    async getWallets() {
        return akashDao.getWallets();
    }

    async getWalletByName(walletName: string) {
        return akashDao.getWalletByName(walletName);
    }

    async deleteWalletByName(walletName: string) {
        return akashDao.deleteWalletByName(walletName);
    }

    async importWalletByMnemonic(walletName: string, mnemonic: string) {
        return akashDao.importWalletByMnemonic(walletName, mnemonic);
    }

    // TODO: needs testing
    async getWalletBalanceByAddress(walletAddress: string, node: string) {
        return akashDao.getWalletBalanceByAddress(walletAddress, node);
    }
}

export default new AkashService();