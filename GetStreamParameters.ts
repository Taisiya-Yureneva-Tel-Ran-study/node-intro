import { GetBooleanParameterValue, GetNumberParameterValue } from "./utils/ReadConfigParameter.ts";

const COUNT_PARAMETER_NAME = "count";
const MIN_PARAMETER_NAME = "min";
const MAX_PARAMETER_NAME = "max";
const UNIQUE_PARAMETER_NAME = "unique";
const MIN_DEFAULT = 1;
const MAX_DEFAULT = 49;
const COUNT_DEFAULT = 7;
const UNIQUE_DEFAULT = false;

export function getParameters() {
    const count = GetNumberParameterValue(COUNT_PARAMETER_NAME, COUNT_DEFAULT);
    const min = GetNumberParameterValue(MIN_PARAMETER_NAME, MIN_DEFAULT);
    const max = GetNumberParameterValue(MAX_PARAMETER_NAME, MAX_DEFAULT);
    const unique = GetBooleanParameterValue(UNIQUE_PARAMETER_NAME, UNIQUE_DEFAULT);
    return {count, min, max, unique};
}
