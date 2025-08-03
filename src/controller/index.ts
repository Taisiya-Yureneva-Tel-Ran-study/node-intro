import express, {Request, Response} from "express";
import { requestTime } from "../middleware/requestTime.ts";
import { limitRequests, TooManyRequestsError } from "../middleware/limitRequests.ts";

const port = 3501;

const app = express();
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(express.json());

app.post("/api/greet", requestTime, limitRequests, (req: Request & {requestTime: string, error: Error}, res) => {
    res.statusCode = 200;
    let result: string = "";
    if (req.error) {
        res.statusCode = req.error instanceof TooManyRequestsError ? 429 : 400;
        result = req.error.message;
    }
    else {
        result = JSON.stringify({"message": "Hello!", "requestedAt": req.requestTime});
    }

    res.end(result);
})

app.get("/api/status", requestTime, (req: Request & {requestTime: string}, res) => {
    res.statusCode = 200;
    res.end(JSON.stringify({"status": "Up and Running", "requestedAt": req.requestTime}));
})