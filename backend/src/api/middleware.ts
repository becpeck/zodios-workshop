import { Request, Response, NextFunction } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
    console.log(`[${new Date().toISOString()}] ${req.method} to ${req.url}`);
    next();
}
