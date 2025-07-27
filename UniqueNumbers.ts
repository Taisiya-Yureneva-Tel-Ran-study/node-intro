import { Transform } from "node:stream";
import { TransformCallback } from "stream";

export default class UniqueNumbers extends Transform {
    private _set: Set<number> = new Set();

    constructor() {
        super({objectMode: true});
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if (!this._set.has(chunk)) {
            this._set.add(chunk);
            this.push(chunk);
        }
        callback();
    }
}