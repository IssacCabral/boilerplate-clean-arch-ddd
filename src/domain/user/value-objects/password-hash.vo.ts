import { AbstractValueObject } from "../../@shared/abstract.vo.shared";

export class PasswordHash extends AbstractValueObject<string> {
  static create(hash: string): PasswordHash {
    if (hash.length < 20) {
      throw new Error("Invalid password hash");
    }

    return new PasswordHash(hash);
  }
}
