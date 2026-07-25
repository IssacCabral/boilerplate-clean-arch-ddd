import { AbstractValueObject } from "../../@shared/abstract.vo.shared";

export class Password extends AbstractValueObject<string> {
  static create(password: string): Password {
    if (password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }
    return new Password(password);
  }
}
