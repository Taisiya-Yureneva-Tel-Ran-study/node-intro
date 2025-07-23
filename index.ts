import RandomNumberStream from "./RandomNumberStream.ts";
import { GetBooleanParameterValue, GetNumberParameterValue } from "./utils/ReadConfigParameter.ts";

const COUNT_PARAMETER_NAME = "count";
const MIN_PARAMETER_NAME = "min";
const MAX_PARAMETER_NAME = "max";
const UNIQUE_PARAMETER_NAME = "unique";
const MIN_DEFAULT = 1;
const MAX_DEFAULT = 49;
const COUNT_DEFAULT = 7;
const UNIQUE_DEFAULT = false;

function getParameters() {
    const count = GetNumberParameterValue(COUNT_PARAMETER_NAME, COUNT_DEFAULT);
    const min = GetNumberParameterValue(MIN_PARAMETER_NAME, MIN_DEFAULT);
    const max = GetNumberParameterValue(MAX_PARAMETER_NAME, MAX_DEFAULT);
    const unique = GetBooleanParameterValue(UNIQUE_PARAMETER_NAME, UNIQUE_DEFAULT);
    return {count, min, max, unique};
}

const {count, min, max, unique} = getParameters();
const rns = new RandomNumberStream(count, min, max, unique);

rns.pipe(process.stdout);
rns.on("end", () => {
    process.stdout.write("\nend emitted", 
    // We seem to have to use the callback here to be sure 
    // that all the data is written to the stdout before the process exits
    // (specifically when count in small)
        () => console.log("\nNow it should end correctly. Bye!"));
});

