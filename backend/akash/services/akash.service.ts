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

    async addWallet(addWalletFields: PostKeysAddDto) {
        return akashDao.postKeysAdd(addWalletFields);
    }
}

export default new AkashService();