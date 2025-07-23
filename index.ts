import { getParameters } from "./GetStreamParameters.ts";
import RandomNumberStream from "./RandomNumberStream.ts";

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

