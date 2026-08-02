import { UserStatus } from "../../../domain/user/enums/user-status.enum";
import { RoleDto } from "../../access-control/role/dtos/role.dto";

export interface UserDto {
  id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  documentNumber?: string;
  status: UserStatus;
  avatarUrl?: string;
  isProfileCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithRoleDto extends UserDto {
  role: RoleDto;
}
