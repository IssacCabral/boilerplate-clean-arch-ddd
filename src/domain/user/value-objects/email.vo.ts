import { AbstractValueObject } from "../../@shared/abstract.vo.shared";
import { Either, left, right } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import { InvalidEmailError } from "../errors/invalid-email.error";

export class Email extends AbstractValueObject<string> {
  static create(email: string): Either<IError, Email> {
    if (!email.includes("@")) {
      return left(InvalidEmailError);
    }
    return right(new Email(email));
  }

  static restore(email: string): Email {
    const result = Email.create(email);
    if (result.isLeft()) {
      throw new Error(result.value.message);
    }
    return result.value;
  }

  static isValid(email: string): boolean {
    return email.includes("@");
  }

  domain(): string {
    return this.getValue().split("@")[1];
  }
}
