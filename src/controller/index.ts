import http from "node:http";
import compute from "../service/compute.ts";
import { checkRequestData, formatResult } from "../utils/utils.ts";

const server = http.createServer();
const port = 3501;

server.listen(port, () => console.log(`Server started on port ${port}`));

server.on("request", async (req, res) => {
    res.statusCode = 200;
    let result: string = "";
    let data = "";
    for await (let chunk of req) {
        data += chunk;
    }
    
    try {
        const {operation, first, second} = JSON.parse(data);
        checkRequestData(operation, first, second);
        result = formatResult(first, second, operation, compute(operation, first, second));
    } catch (err) {
        res.statusCode = 400;
        result = err.message;
        console.log("Error: ", err.message);
    }
    
    res.end(result);
})