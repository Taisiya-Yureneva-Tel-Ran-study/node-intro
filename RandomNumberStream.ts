import { Readable } from "node:stream";
import { GetParameterValue } from "./utils/ReadConfigParameter.ts";
import _ from "lodash";

const MIN_DEFAULT = '1';
const MAX_DEFAULT = '49';
const COUNT_DEFAULT = '7';
const UNIQUE_DEFAULT = false;
const COUNT_PARAMETER_NAME = "count";
const MIN_PARAMETER_NAME = "min";
const MAX_PARAMETER_NAME = "max";
const UNIQUE_PARAMETER_NAME = "unique";

export default class RandomNumberStream extends Readable {
    private _counter: number = 0;
    private _count: number;
    private _min: number;
    private _max: number; 
    private _unique: boolean;
    private _generated: number[] = [];

    private setDefaults() {
        this._min = Number(MIN_DEFAULT);
        this._max = Number(MAX_DEFAULT);
        this._count = Number(COUNT_DEFAULT);
        this._unique = UNIQUE_DEFAULT;
    }
    
    private checkParameters() {
        if ((this._unique && this._min >= this._max - this._count) || 
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

    constructor(options: any = {encoding: "utf-8", highWaterMark: 1}) {
        super(options);
        this._count = Number(GetParameterValue(COUNT_PARAMETER_NAME, COUNT_DEFAULT));
        this._min = Number(GetParameterValue(MIN_PARAMETER_NAME, MIN_DEFAULT));
        this._max = Number(GetParameterValue(MAX_PARAMETER_NAME, MAX_DEFAULT));
        this._unique = GetParameterValue(UNIQUE_PARAMETER_NAME, false) === "true";
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