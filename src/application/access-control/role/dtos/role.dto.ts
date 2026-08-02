import { RoleIdentifier } from "../../../../domain/access-control/role/enums/role-identifier.enum";

export interface RoleDto {
  id: string;
  identifier: RoleIdentifier;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
