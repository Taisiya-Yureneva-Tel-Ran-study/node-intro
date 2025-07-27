import { pipeline } from "node:stream/promises";
import { getParameters } from "./GetStreamParameters.ts";
import RandomNumberStream from "./RandomNumberStream.ts";
import UniqueNumbers from "./UniqueNumbers.ts";
import CounterStream from "./CounterStream.ts";
import OutputStream from "./OutputStream.ts";

async function showNums(min: number, max: number, count: number): Promise<void> {
    await pipeline(
        new RandomNumberStream(min, max),
        new UniqueNumbers(),
        new CounterStream(count),
        new OutputStream()
    );
}

try {
    const {min, max, count} = getParameters();

    await showNums(min, max, count);
} catch (err) { 
    console.log(err.message, "Exiting...");
}