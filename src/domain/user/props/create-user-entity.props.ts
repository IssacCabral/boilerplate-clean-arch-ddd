import { RoleProps } from "../../access-control/role/props/role.props";
import { DocumentNumber } from "../value-objects/document-number.vo";
import { PhoneNumber } from "../value-objects/phone-number.vo";
import { UserName } from "../value-objects/user-name.vo";
import { UserProps } from "./user.props";

export type CreateUserEntityProps = Pick<
  UserProps,
  "id" | "email" | "passwordHash"
> & {
  avatarUrl?: string;
  name?: UserName;
  phoneNumber?: PhoneNumber;
  documentNumber?: DocumentNumber;
  role: RoleProps;
};
