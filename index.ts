import { createReadStream } from "node:fs";

const stream = createReadStream("large_file", {encoding: "binary", highWaterMark: 1024* 1024});
let len = 0;

stream.on("data", chunk => {
    len += chunk.length;
 //   console.log(len);
});

stream.on("end", () => {console.log(len)});
stream.on("error", err => {console.log(err)});