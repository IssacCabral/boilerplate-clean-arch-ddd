import { Timestamps } from "../../@shared/timestamps.shared";
import { Email } from "../value-objects/email.vo";
import { UserName } from "../value-objects/user-name.vo";
import { PhoneNumber } from "../value-objects/phone-number.vo";
import { DocumentNumber } from "../value-objects/document-number.vo";
import { UserStatus } from "../enums/user-status.enum";
import { PasswordHash } from "../value-objects/password-hash.vo";
import { RoleProps } from "../../access-control/role/props/role.props";

export interface UserProps extends Timestamps {
  id: string;
  email: Email;
  passwordHash: PasswordHash;
  name?: UserName;
  phoneNumber?: PhoneNumber;
  documentNumber?: DocumentNumber;
  status: UserStatus;
  avatarUrl?: string;
  isProfileCompleted: boolean;
  role?: RoleProps;
}
