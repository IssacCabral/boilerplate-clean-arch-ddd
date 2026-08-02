import { AbstractValueObject } from "../../@shared/abstract.vo.shared";
import { Either, left, right } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import { InvalidPhoneNumberError } from "../errors/invalid-phone-number.error";

export class PhoneNumber extends AbstractValueObject<string> {
  static create(phone: string): Either<IError, PhoneNumber> {
    if (!phone.startsWith("+55")) {
      return left(InvalidPhoneNumberError);
    }
    return right(new PhoneNumber(phone));
  }

  static restore(phone: string): PhoneNumber {
    const result = PhoneNumber.create(phone);
    if (result.isLeft()) {
      throw new Error(result.value.message);
    }
    return result.value;
  }
}
