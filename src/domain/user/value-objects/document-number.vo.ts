import { AbstractValueObject } from "../../@shared/abstract.vo.shared";

export class DocumentNumber extends AbstractValueObject<string> {
  static create(document: string): DocumentNumber {
    if (!document.startsWith("000.000.000-00")) {
      // todo: mudar para either?
      throw new Error("Document number must be in the format 000.000.000-00");
    }

    return new DocumentNumber(document);
  }
}
