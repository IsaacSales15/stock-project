import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

export function errorHandlerMiddleware(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);
    if (err instanceof ApiError){
        const status = res.status(err.status)
        return status.json({ sucess: false, message: err.message });
    }
}
