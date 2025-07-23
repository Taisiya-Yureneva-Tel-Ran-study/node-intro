import { Readable } from "node:stream";
import _ from "lodash";

const MIN_DEFAULT = 1;
const MAX_DEFAULT = 49;
const COUNT_DEFAULT = 7;
const UNIQUE_DEFAULT = false;

export default class RandomNumberStream extends Readable {
    private _counter: number = 0;
    private _generated: number[] = [];

    private setDefaults() {
        this._min = Number(MIN_DEFAULT);
        this._max = Number(MAX_DEFAULT);
        this._count = Number(COUNT_DEFAULT);
        this._unique = UNIQUE_DEFAULT;
    }
    
    private checkParameters() {
        if ((this._unique && this._min > this._max - this._count) || 
                this._min >= this._max) {
            console.log(`Invalid config parameters: cannot generate ${this._count} ${this._unique ? "unique" : ""} numbers between ${this._min} and ${this._max}`);
            console.log("Using defaults");
            this.setDefaults();
        }
        if (this._count < 0) {
            console.log(`Invalid config parameters: cannot generate ${this._count} numbers`);
            console.log("Using defaults");
            this.setDefaults();
        }
    }

    private generateNonUnique() {
        return Array.from({length: this._count}, () => _.random(this._min, this._max));
    }

    private generateUnique() {
        const ra = _.range(this._min, this._max+1);
        return _.sampleSize(ra, this._count);
    }

    constructor(    private _count: number = COUNT_DEFAULT,
                    private _min: number = MIN_DEFAULT,
                    private _max: number = MAX_DEFAULT, 
                    private _unique: boolean = UNIQUE_DEFAULT) {
        super();
        this.checkParameters();
        this._generated = this._unique ?  this.generateUnique() : this.generateNonUnique();
    }

    _read(): void {
        if (this._counter < this._count) {
            this.push(this._generated[this._counter]+"; ");
            this._counter++;
        } else {
            this.push(null);
        }
    }

}