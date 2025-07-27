import { Readable, Writable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { TransformCallback } from "stream";

class NumberClass extends Readable {
    private _counter = 0;
    constructor() {
        super({objectMode: true});
    }

    _read () {
        this.push(this._counter++);
    }
}

class EvenNUmbers extends Transform {
    constructor() {
        super({objectMode: true});
    }

    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if (chunk % 2 === 0) {
            this.push(chunk);
        }
        callback();
    }
}

class Limit extends Transform {
    private _counter = 0;
    constructor(private _limit: number) {
        super({objectMode: true});
    }
    _transform(chunk: any, encoding: BufferEncoding, callback: TransformCallback): void {
        if (this._counter < this._limit) {
            this.push(chunk);
            this._counter++;
            callback();
        } else {
            this.push(null);
        }
    }
}

class OutputStream extends Writable {
    constructor() {
        super({objectMode: true});
    }
    _write(chunk: any, encoding: BufferEncoding, callback: (error?: Error | null) => void): void {
        console.log(chunk + "; ");
        callback();
    }

}

async function displayEvenNumbers(count: number): Promise<void> {
    await pipeline(
        new NumberClass(),
        new EvenNUmbers(),
        new Limit(count),
        new OutputStream()
    )
}

displayEvenNumbers(20).catch((err) => console.log(err.message));