import { createWriteStream } from "node:fs";

const writeStream = createWriteStream("test.txt", {"highWaterMark": 1024*1024});
let index = 0;
const max = 1000000;
function write () {
    let canWrite = true;
    while (canWrite && index < max)
    {
        canWrite = writeStream.write("Hello".repeat(1000));
        index += 5;
    }
    if (index < max)
    {
        writeStream.once("drain", write);
    }
}

write();