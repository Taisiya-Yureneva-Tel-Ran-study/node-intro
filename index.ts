import {readFile} from "fs/promises";

async function fileSize(path: string): Promise<number> {
    const content = await readFile(path, {encoding: "binary"});
    return content.length;
}

fileSize("large_file").then(len => console.log(len));