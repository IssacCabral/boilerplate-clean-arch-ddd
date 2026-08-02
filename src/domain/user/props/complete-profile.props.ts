import { DocumentNumber } from "../value-objects/document-number.vo";
import { PhoneNumber } from "../value-objects/phone-number.vo";
import { UserName } from "../value-objects/user-name.vo";

export interface CompleteProfileProps {
  name: UserName;
  phoneNumber: PhoneNumber;
  documentNumber: DocumentNumber;
}
