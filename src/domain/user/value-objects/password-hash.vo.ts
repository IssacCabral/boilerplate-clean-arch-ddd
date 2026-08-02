import { AbstractValueObject } from "../../@shared/abstract.vo.shared";
import { Either, left, right } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import { InvalidPasswordHashError } from "../errors/invalid-password-hash.error";

export class PasswordHash extends AbstractValueObject<string> {
  static create(hash: string): Either<IError, PasswordHash> {
    if (hash.length < 20) {
      return left(InvalidPasswordHashError);
    }

    return right(new PasswordHash(hash));
  }

  static restore(hash: string): PasswordHash {
    const result = PasswordHash.create(hash);
    if (result.isLeft()) {
      throw new Error(result.value.message);
    }
    return result.value;
  }
}
