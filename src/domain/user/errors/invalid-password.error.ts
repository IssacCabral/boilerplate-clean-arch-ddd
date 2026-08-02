import { IError } from "../../../@shared/error.shared";

export const InvalidPasswordError: IError = {
  code: "USER_INVALID_PASSWORD",
  message: "Password must be at least 8 characters long.",
};
