import { NextFunction, Request, Response } from "express";

export function requestTime(req: Request & {requestTime: string}, res: Response, next: NextFunction) {
    const date = new Date();
    req.requestTime = date.toLocaleString();

    next();
}