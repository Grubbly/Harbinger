import { exec } from "child_process";
import debug from "debug";

const log: debug.IDebugger = debug('app:akash-base')

class AkashBase {
    private platform: string;

    constructor() {
        this.platform = 'windows';
    }

    async run(rawCommand: string) {
        await exec(rawCommand, async (error, response, errorMessage) => {
            log('Error: ', error);
            log('Response ', response);
            log('Error Message: ', errorMessage);

            if(error) {
                return errorMessage;
            }
            return response;
        });
    }
}

export default new AkashBase();