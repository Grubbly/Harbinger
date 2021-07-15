import debug from 'debug';
import ExecPromise from '../helpers/helper.exec.promise';

const log: debug.IDebugger = debug('app:exec-promise');

class ExecPromiseService {
    constructor() {
        log("Exec promise service has been created")
    }
    
    // Helper wrapper around ExecPromise.exec that includes
    // try catch error handling.
    async exec(command: string) {
        try {
            const results = await ExecPromise.exec(command);    
            return results;
        } 
        catch(error) {
            log(`Executing command resulted in error: ${error}`);
            return error;
        }
    }

    async execWithStdin(command: string, stdin: string) {
        try {
            const promise = ExecPromise.exec(command);
            const child = promise.child;
            
            child.stdin.setEncoding('utf-8');
            child.stdin.write(stdin+'\n');
            child.stdin.end();

            return await promise;
        } 
        catch(error) {
            log(`Executing command resulted in error: ${error}`);
            return error;
        }   
    }
}

export default new ExecPromiseService();