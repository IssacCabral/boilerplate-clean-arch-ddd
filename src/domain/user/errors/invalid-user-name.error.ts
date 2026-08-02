import { IError } from "../../../@shared/error.shared";

export const InvalidUserNameError: IError = {
  code: "USER_INVALID_NAME",
  message: "Name must be at least 3 characters long.",
};
