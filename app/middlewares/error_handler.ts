import { Request, Response, NextFunction } from "express";

export function errorHandlerMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Erro interno no servidor";

  if (req.headers.accept?.includes("application/json")) {
    res.status(statusCode).json({ error: message });
  } else {
    res.status(statusCode).render("error", { message });
  }
}
