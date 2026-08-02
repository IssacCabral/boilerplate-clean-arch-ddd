import { IError } from "../../../@shared/error.shared";

export const InvalidPhoneNumberError: IError = {
  code: "USER_INVALID_PHONE_NUMBER",
  message: "Phone number must start with +55.",
};
