import { IError } from "../../../@shared/error.shared";

export const InvalidPasswordHashError: IError = {
  code: "USER_INVALID_PASSWORD_HASH",
  message: "Invalid password hash.",
};
