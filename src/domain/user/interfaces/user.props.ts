import { Timestamps } from "../../shared/timestamps.shared";
import { Email } from "../value-objects/email.vo";
import { UserName } from "../value-objects/user-name.vo";
import { PhoneNumber } from "../value-objects/phone-number.vo";
import { DocumentNumber } from "../value-objects/document-number.vo";

export interface UserProps extends Timestamps {
  id: string;
  email: Email;
  name?: UserName;
  phoneNumber?: PhoneNumber;
  documentNumber?: DocumentNumber;
  avatarUrl?: string;
  isProfileComplete: boolean;
}
