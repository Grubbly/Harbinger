import debug from "debug";
import akashDao from "../daos/akash.dao";
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
}

export default new AkashService();