import debug from "debug";

const log: debug.IDebugger = debug('app:akash-base')

class AkashCLI {
    private platform: string;

    constructor() {
        // TODO: code a smart way to detect this
        this.platform = 'windows';
    }
}

export default new AkashCLI();