import { Request, Response, NextFunction } from "express";

/**
* Middleware function for handling errors in Express.
*
* @param {any} err - The error to be handled.
* @param {Request} req - The Express Request object.
* @param {Response} res - The Express Response object.
* @param {NextFunction} next - The next middleware function in the Express chain.
*
* @remarks
* If the error has a "statusCode" attribute, it will be used as the response status.
* Otherwise, the status will be 500.
*
* If the error has a "message" attribute, it will be used as the response message.
* Otherwise, the message will be "Internal server error."
*
* If the request's "Accept" header includes "application/json," the
* response will be in JSON format. Otherwise, the response will be in
* HTML format, rendering the "error/error_handle" view.
*/
export function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno no servidor";

  console.error(err);
  if (req.headers.accept?.includes("application/json")) {
    res.status(statusCode).json({ error: message });
  } else {
    res.status(statusCode).render("error/error_handle", { message });
  }
}
