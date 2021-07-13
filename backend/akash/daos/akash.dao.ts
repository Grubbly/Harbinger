import { PostRawCommand } from '../dto/post.raw.command.dto';
import debug from 'debug';
import { exec } from 'child_process';

const log: debug.IDebugger = debug('app:akash-dao');

class AkashDao {
    constructor() {
        log('Created new instance of AkashDao');
    }

    async postRawCommand(commandFields: PostRawCommand) {
        log('Running raw command: ', commandFields.command);
        
        const execResults =  await exec(
            commandFields.command, 
            async (error, response, errorMessage) => {
                log('Error: ', error);
                log('Response ', response);
                log('Error Message: ', errorMessage);

                return {error, response, errorMessage};
            }
        );

        log('Command executed with:\n', execResults);
        return execResults;
    }
}