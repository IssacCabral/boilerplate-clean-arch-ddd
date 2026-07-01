import { AbstractValueObject } from "../../shared/abstract.vo.shared";

export class Email extends AbstractValueObject<string> {
  static create(email: string): Email {
    if (!email.includes("@")) {
      // todo: mudar para either?
      throw new Error("Invalid email");
    }
    return new Email(email);
  }

  static isValid(email: string): boolean {
    return email.includes("@");
  }

  domain(): string {
    return this.getValue().split("@")[1];
  }
}
