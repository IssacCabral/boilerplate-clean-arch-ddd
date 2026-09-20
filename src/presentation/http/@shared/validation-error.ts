import { z } from "zod";
import { IError } from "../../../@shared/error.shared";

export function makeValidationError(error: z.ZodError): IError {
  return {
    code: "HTTP_VALIDATION_ERROR",
    message: "Invalid request data.",
    details: error.issues.map((issue) => {
      const [source = "request", ...fieldPath] = issue.path.map(String);

      return {
        source,
        field: fieldPath.join(".") || source,
        message: issue.message,
        code: issue.code,
      };
    }),
  };
}
