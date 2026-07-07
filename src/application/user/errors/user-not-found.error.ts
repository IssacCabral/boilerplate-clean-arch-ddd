import { IError } from "../../../domain/shared/error.shared";

export const UserNotFoundError: IError = {
  code: "USR-A-002",
  message: "User not found.",
  shortMessage: "userNotFound",
};
