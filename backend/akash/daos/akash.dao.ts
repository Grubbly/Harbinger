import { PostRawCommandDto } from '../dto/post.raw.command.dto';
import debug from 'debug';
import ExecPromise from '../../common/helpers/helper.exec.promise';

const log: debug.IDebugger = debug('app:akash-dao');

class AkashDao {
    constructor() {
        log('Created new instance of AkashDao');
    }

    async postRawCommand(commandFields: PostRawCommandDto) {
        const command = 'akash ' + commandFields.command;
        log('Running raw command: ', command);
        
        try {
            const results = await ExecPromise.exec(command);    
            return results;
        } 
        catch(error) {
            log("Executing command resulted in error:", error);
            return error;
        }
    }
}

export default new AkashDao();