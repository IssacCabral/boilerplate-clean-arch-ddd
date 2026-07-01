import { AbstractValueObject } from "../../shared/abstract.vo.shared";

export class PhoneNumber extends AbstractValueObject<string> {
  static create(phone: string): PhoneNumber {
    if (!phone.startsWith("+55")) {
      // todo: mudar para either?
      throw new Error("Phone number must start with +55");
    }
    return new PhoneNumber(phone);
  }
}
