import config from "config";
import { readFile, writeFile } from "node:fs/promises"

interface FilePaths {
    initialFile: string;
    codeFile: string;
    commentFile: string;
}

function getPaths(): FilePaths {
    return {
        initialFile: config.get("files.initialFile"),
        codeFile: config.get("files.codeFile"),
        commentFile: config.get("files.commentsFile")
    };
}

async function getText(file: string) : Promise<string> {
    return await readFile(file, {encoding: "utf-8"});
}

function parseText(text: string) {
    const lines = text.split('\n');
    const comments: string[] = [];
    const code: string[] = [];

    for (const line of lines) {
        const commentStart = line.indexOf('//');

        if (commentStart < 0) {
            code.push(line);
        } else if (commentStart === 0) {
            comments.push(line);
        } else {
            code.push(line.slice(0, commentStart));
            comments.push(line.slice(commentStart));
        }
    }

    const codeString = code.join('\n');
    const commentsString = comments.join('\n');

    return { commentsString, codeString };
}

async function writeToFile(file: string, text: string) {
    await writeFile(file, text);
}

const paths = getPaths();

const text = await getText(paths.initialFile);

const parsed = parseText(text);

await writeToFile(paths.codeFile, parsed.codeString).catch((err) => console.log(err));
await writeToFile(paths.commentFile, parsed.commentsString).catch((err) => console.log(err));
