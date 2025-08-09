import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction ) => {
    res.statusCode = 400;
    const mes = err instanceof ZodError ? getZodMessage(err) : err.message;
    res.send(err.message);

}

function getZodMessage(err: ZodError): string {
    return err.issues.reduce((res: string, issue) => res + `${res ? "; " : ""}${issue.path.join(".")}${issue.message}`, "")
}