import { Writable } from "node:stream";

export default class OutputStream extends Writable {
    constructor() {
        super({objectMode: true});
    }
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        process.stdout.write(chunk + "; ");
        callback();
    }
    _final(): void {
        process.stdout.write("\n");
    }

}
