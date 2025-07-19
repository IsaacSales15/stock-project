import { ZodTypeAny, infer as zInfer } from "zod";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

/**
 * Validate the request data based on the given schema and source.
 *
 * @param {ZodTypeAny} schema - The schema to validate against.
 * @param {"body" | "params"} source - The source of the data to validate.
 * @returns {(req: Request, res: Response, next: NextFunction) => Promise<void>} -
 *   A middleware function that validates the request data and calls `next()`
 *   if it is valid.
 *
 * @example
 * const schema = z.object({
 *   name: z.string(),
 * });
 *
 * app.post("/users", validate(schema, "body"), (req, res) => {
 *   // req.validatedData is the validated data
 * });
 */
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
