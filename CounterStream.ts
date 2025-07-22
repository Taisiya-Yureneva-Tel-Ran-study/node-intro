import { Readable } from "node:stream";

export default class CounterStream extends Readable {
    counter: number = 0;
    constructor(private _max: number, options: any = {encoding: "utf-8"}) {
        super(options);

    }
    _read(size: number): void {
        if (this.counter >= this._max) {
            this.push(null);
        } else {
            this.push(this.counter+";");
            this.counter++;
        }
    }
}