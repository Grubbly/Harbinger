import express from 'express';
import akashService from '../services/akash.service';
import debug from 'debug';
import { ExecResultsDto } from '../dto/exec.results.dto';

const log: debug.IDebugger = debug('app:akash-controller');

class AkashController {
    // Raw command sent in POST request
    // TODO: make a get version of this with URL param
    async runRawCommand(req: express.Request, res: express.Response) {
        const results: ExecResultsDto = await akashService.run(req.body);
        
        if(results.stderr) {
            // Bad command was executed, send error
            res.status(400).send(results);
        }
        else {
            // Command was good, send output
            res.status(201).send(results);
        }
    }
}

export default new AkashController();