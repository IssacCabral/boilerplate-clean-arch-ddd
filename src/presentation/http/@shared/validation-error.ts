import { z } from "zod";
import { IError } from "../../../@shared/error.shared";

export function makeValidationError(error: z.ZodError): IError {
  return {
    code: "HTTP_VALIDATION_ERROR",
    message: "Invalid request data.",
    details: z.treeifyError(error),
  };
}
