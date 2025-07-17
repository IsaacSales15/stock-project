import { z, ZodTypeAny, infer as zInfer } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

export function validate<T extends ZodTypeAny>(
  schema: T,
  source: "body" | "params"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    console.log("req.body: ", req.body);

    const result = schema.safeParse(req[source]);

    if (!result.success) {
      const message = result.error.issues
        .map((issue) => issue.message)
        .join(" | ");
      return next(new ApiError(400, message));
    }

    (req as RequestWithValidated<zInfer<T>>).validatedData = result.data;
    next();
  };
}
export type RequestWithValidated<T> = Request & {
  validatedData: T;
};
