import express, {Request, Response} from "express";
import compute from "../service/compute.ts";
import { validation } from "../middleware/validation.ts";
import morgan from "morgan";
import 'dotenv/config';
import {errorHandler} from "../middleware/errorHandler.ts";

function formatResult(first: number, second: number, op: string, res: number) {
    return first + " " + op + " " + second + " = " + res.toString();
}

const port = process.env.PORT || 3501;

const app = express();
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(express.json());

app.use(morgan("tiny"));

app.use(validation);

app.post("/api/calculator", (req: Request & { error: Error }, res: Response) => {
    res.statusCode = 200;
    let result: string = "";
        if (req.error) {
            throw req.error;
        }
        const { operation, first, second } = req.body;
        result = formatResult(first, second, operation, compute(operation, first, second));

    res.end(result);
})

app.get("/api/calculator/:operation/:first/:second", validation, (req: Request & { error: Error }, res) => {
    res.statusCode = 200;
    let result: string = "";
        if (req.error) {
            throw req.error;
        }
        const { operation, first, second } = req.params;
        result = formatResult(Number(first), Number(second), operation, compute(operation, Number(first), Number(second)));

    res.end(result);
})

app.get("/api/calculator", (req: Request & { error: Error }, res) => {
    res.statusCode = 200;
    let result: string = "";
        if (req.error) {
            throw req.error;
        }

        const { operation, first, second } = req.query as any;
        result = formatResult(Number(first), Number(second), operation, compute(operation, Number(first), Number(second)));

    res.end(result);
})

app.use(errorHandler);