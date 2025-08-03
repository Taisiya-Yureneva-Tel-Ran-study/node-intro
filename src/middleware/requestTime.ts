import { NextFunction, Request, Response } from "express";

export function requestTime(req: Request & {requestTime: string, error: Error}, res: Response, next: NextFunction) {
    req.error = undefined;
    const date = new Date();
    req.requestTime = date.toLocaleString();

    next();
}