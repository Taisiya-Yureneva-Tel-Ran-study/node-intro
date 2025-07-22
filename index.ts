import  CounterStream from "./CounterStream.ts";

const cstream: CounterStream = new CounterStream(100);

cstream.on("data", chunk => {console.log(chunk)});
cstream.on("end", () => console.log("end"))