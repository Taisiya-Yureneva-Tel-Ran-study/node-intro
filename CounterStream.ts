import { Transform } from "node:stream";
import { TransformCallback } from "node:stream";

export default class CounterStream extends Transform {
    private _counter: number = 0;
    constructor(private _max: number) {
        if (_max < 0) {
            throw new Error(`CounterStream: count value must be positive, got ${_max}.`);
        }
        super({objectMode: true});
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if (this._counter < this._max) {
            this.push(chunk);
            this._counter++;
        } else{
            this.push(null);
        }
        callback();
    }
}