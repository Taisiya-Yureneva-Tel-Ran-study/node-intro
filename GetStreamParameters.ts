import {  GetNumberParameterValue } from "./utils/ReadConfigParameter.ts";

const COUNT_PARAMETER_NAME = "count";
const MIN_PARAMETER_NAME = "min";
const MAX_PARAMETER_NAME = "max";
const MIN_DEFAULT = 1;
const MAX_DEFAULT = 49;
const COUNT_DEFAULT = 7;

function checkParameters(count: number, min: number, max: number) {
    if (count < 0) {
        throw new Error(`Count cannot be negative (${count}).`);
    }
    if (min > max - count + 1) {
        throw new Error(`Cannot generate ${count} unique numbers between ${min} and ${max}.`);
    }
    if (count > 100000) {
        throw new Error(`Are you sure you need ${count} UNIQUE numbers? Consider using less.`);
    }
}

export function getParameters() {
    const count = GetNumberParameterValue(COUNT_PARAMETER_NAME, COUNT_DEFAULT);
    const min = GetNumberParameterValue(MIN_PARAMETER_NAME, MIN_DEFAULT);
    const max = GetNumberParameterValue(MAX_PARAMETER_NAME, MAX_DEFAULT);
    checkParameters(count, min, max);
    return {count, min, max};
}
