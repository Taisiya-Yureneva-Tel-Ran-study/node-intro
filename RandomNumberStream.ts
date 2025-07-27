import { Readable } from "node:stream";
import _ from "lodash";

export default class RandomNumberStream extends Readable {
    constructor(private _min: number,
                private _max: number) {
        if (_min > _max) {
            throw new Error(`RandomNumberStream: invalid parameters, ${_min} (min) > ${_max} (max), cannot generate numbers.`);
        }
        super({ objectMode: true });
    }

    _read(): void {
        this.push(_.random(this._min, this._max));
    }

}