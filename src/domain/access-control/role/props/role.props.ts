import { Timestamps } from "../../../@shared/timestamps.shared";
import { PermissionProps } from "../../permission/props/permission.props";
import { RoleIdentifier } from "../enums/role-identifier.enum";

export interface RoleProps extends Timestamps {
  id: string;
  identifier: RoleIdentifier;
  description: string;
  permissions?: PermissionProps[];
}
