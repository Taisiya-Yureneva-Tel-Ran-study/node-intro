import http from "node:http";

const server = http.createServer();
const port = 3501;

server.listen(port, () => console.log(`Server started on port ${port}`));

server.on("request", (req, res) => {
    res.statusCode = 200;
    let data = "";
    req.on("data", (chunk) => {
        console.log(chunk.toString());
        data += chunk;
    })
    req.on("end", () => {
        console.log(data);
        res.write(data);
        res.end("\nHello World");
    })
//    res.write(JSON.stringify({method: req.method, url: req.url}));
})