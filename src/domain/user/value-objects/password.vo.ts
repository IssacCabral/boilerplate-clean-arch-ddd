import { AbstractValueObject } from "../../@shared/abstract.vo.shared";
import { Either, left, right } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import { InvalidPasswordError } from "../errors/invalid-password.error";

export class Password extends AbstractValueObject<string> {
  static create(password: string): Either<IError, Password> {
    if (password.length < 8) {
      return left(InvalidPasswordError);
    }
    return right(new Password(password));
  }

  static restore(password: string): Password {
    const result = Password.create(password);
    if (result.isLeft()) {
      throw new Error(result.value.message);
    }
    return result.value;
  }
}
