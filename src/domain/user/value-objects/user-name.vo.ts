import { AbstractValueObject } from "../../@shared/abstract.vo.shared";
import { Either, left, right } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import { InvalidUserNameError } from "../errors/invalid-user-name.error";

export class UserName extends AbstractValueObject<string> {
  static create(name: string): Either<IError, UserName> {
    if (name.length < 3) {
      return left(InvalidUserNameError);
    }
    return right(new UserName(name));
  }

  static restore(name: string): UserName {
    const result = UserName.create(name);
    if (result.isLeft()) {
      throw new Error(result.value.message);
    }
    return result.value;
  }
}
