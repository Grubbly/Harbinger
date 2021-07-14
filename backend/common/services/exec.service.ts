import debug from 'debug';
import ExecPromise from '../helpers/helper.exec.promise';

const log: debug.IDebugger = debug('app:exec-promise');

class ExecPromiseService {
    constructor() {
        log("Exec promise service has been created")
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
}

export default new ExecPromiseService();