// Wrapper around exec to make it usable with promises

import debug from "debug";
import util from 'util';

// Promisify exec from child_process
const exec = util.promisify(require('child_process').exec);
const log: debug.IDebugger = debug("app:helper-exec-promise");

class ExecPromise {
    constructor() {
        log("ExecPromise helper has been constructed");
    }

    exec(command: string) {
        const promise = exec(command);
        const child = promise.child;
        
        child.stdout.on('data', (stdout: string) => {
            log(stdout);
        });
        child.stderr.on('data', (stderr: string) => {
            log(stderr);
        });
        child.on('close', (command: string) => {
            log("Closing command: ", command);
        });

        return promise; 
    }
}

export default new ExecPromise();