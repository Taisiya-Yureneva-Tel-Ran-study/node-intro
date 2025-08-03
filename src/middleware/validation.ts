import { NextFunction, Request, Response } from "express";

export function validation(req: Request & { error: Error }, res: Response, next: NextFunction) {
    const { operation, first, second } = req.body ?? req.params;
    req.error = undefined;
    try {
        if (!operation || typeof operation !== "string")
            throw new Error("operation should be defined and be string")

        let firstNum: number = Number(first);
        let secondNum: number = Number(second);

        if (Number.isNaN(firstNum) || Number.isNaN(secondNum)) {
            throw new Error("Request data is not valid, check that first and second are numbers")
        }
    } catch (error) {
        req.error = error;
    }
    next();
}