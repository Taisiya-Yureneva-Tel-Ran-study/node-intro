import { NextFunction, Request, Response } from "express";

let userRequests: Record<string, Array<number>> = {}

export class TooManyRequestsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "TooManyRequestsError";
    }
}

export function limitRequests(req: Request & {requestTime: string, error: Error }, res: Response, next: NextFunction) {
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 minute
    const ip = req.ip;

    if (!userRequests[ip]) {
        userRequests[ip] = [];
    }

    userRequests[ip] = userRequests[ip].filter(ts => now - ts < windowMs);

    if (userRequests[ip].length >= 3) {
        console.log(`Too many requests from ${ip}`);
        req.error = new TooManyRequestsError(`Too many requests from ${ip}, please try again later.`);
    }

    userRequests[ip].push(now);
    next();
}