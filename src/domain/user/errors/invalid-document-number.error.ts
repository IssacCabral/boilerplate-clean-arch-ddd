import { IError } from "../../../@shared/error.shared";

export const InvalidDocumentNumberError: IError = {
  code: "USER_INVALID_DOCUMENT_NUMBER",
  message: "Document number must be in the format 000.000.000-00.",
};
