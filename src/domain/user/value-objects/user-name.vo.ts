import { AbstractValueObject } from "../../shared/abstract.vo.shared";

export class UserName extends AbstractValueObject<string> {
  static create(name: string): UserName {
    if (name.length < 3) {
      // todo: mudar para either?
      throw new Error("Name must be at least 3 characters long");
    }
    return new UserName(name);
  }
}
