import express, {Request, Response} from "express";
import { requestTime } from "../middleware/requestTime.ts";
import rateLimit from "../../node_modules/express-rate-limit/dist/index.cjs";

const port = 3501;

const app = express();
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(express.json());

app.use(requestTime)

app.post("/api/greet", rateLimit({windowMs: 60 * 1000, max: 3}), (req: Request & {requestTime: string, error: Error}, res) => {
    res.statusCode = 200;
    res.json({"message": "Hello!", "requestedAt": req.requestTime});
})

app.get("/api/status", (req: Request & {requestTime: string}, res) => {
    res.statusCode = 200;
    res.json({"status": "Up and Running", "requestedAt": req.requestTime});
})