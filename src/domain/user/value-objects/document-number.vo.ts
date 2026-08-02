import { AbstractValueObject } from "../../@shared/abstract.vo.shared";
import { Either, left, right } from "../../../@shared/either.shared";
import { IError } from "../../../@shared/error.shared";
import { InvalidDocumentNumberError } from "../errors/invalid-document-number.error";

export class DocumentNumber extends AbstractValueObject<string> {
  static create(document: string): Either<IError, DocumentNumber> {
    if (!document.startsWith("000.000.000-00")) {
      return left(InvalidDocumentNumberError);
    }

    return right(new DocumentNumber(document));
  }

  static restore(document: string): DocumentNumber {
    const result = DocumentNumber.create(document);
    if (result.isLeft()) {
      throw new Error(result.value.message);
    }
    return result.value;
  }
}
