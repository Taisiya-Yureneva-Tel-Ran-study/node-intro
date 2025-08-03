import express, {Request, Response} from "express";
import compute from "../service/compute.ts";
import { validation } from "../middleware/validation.ts";

function formatResult(first: number, second: number, op: string, res: number) {
    return first + " " + op + " " + second + " = " + res.toString();
}

const port = 3501;

const app = express();
app.listen(port, () => console.log(`Server started on port ${port}`));
app.use(express.json());
app.use(validation);

app.post("/api/calculator", (req: Request & { error: Error }, res: Response) => {
    res.statusCode = 200;
    let result: string = "";
    try {
        if (req.error) {
            throw req.error;
        }
        const { operation, first, second } = req.body;
        result = formatResult(first, second, operation, compute(operation, first, second));
    } catch (err) {
        res.statusCode = 400;
        res.send(err.message);
        console.log("Error: ", err.message);
    }

    res.end(result);
})

app.get("/api/calculator/{:operation}/{:first}/{:second}", validation, (req: Request & { error: Error }, res) => {
    res.statusCode = 200;
    let result: string = "";
    try {
        if (req.error) {
            throw req.error;
        }
        const { operation, first, second } = req.params;
        result = formatResult(Number(first), Number(second), operation, compute(operation, Number(first), Number(second)));
    } catch (err) {
        res.statusCode = 400;
        res.send(err.message);
        console.log("Error: ", err.message);
    }

    res.end(result);
})