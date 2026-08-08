import { RoleEntity } from "../../../domain/access-control/role/entities/role.entity";
import { UserEntity } from "../../../domain/user/entities/user.entity";
import { UserStatus } from "../../../domain/user/enums/user-status.enum";
import {
  RoleDto,
  RoleDtoMapper,
} from "../../access-control/role/dtos/role.dto";

export interface UserDto {
  id: string;
  email: string;
  name?: string;
  phoneNumber?: string;
  documentNumber?: string;
  status: UserStatus;
  avatarUrl?: string;
  isProfileCompleted: boolean;
  role?: RoleDto;
  createdAt: Date;
  updatedAt: Date;
}

export class UserDtoMapper {
  static toDto(user: UserEntity): UserDto {
    const userProps = user.export();
    let role: RoleDto | undefined;

    if (userProps.role) {
      role = RoleDtoMapper.toDto(RoleEntity.hydrate(userProps.role));
    }

    return {
      id: userProps.id,
      email: userProps.email.getValue(),
      name: userProps.name?.getValue(),
      phoneNumber: userProps.phoneNumber?.getValue(),
      documentNumber: userProps.documentNumber?.getValue(),
      status: userProps.status,
      avatarUrl: userProps.avatarUrl,
      isProfileCompleted: userProps.isProfileCompleted,
      role,
      createdAt: userProps.createdAt,
      updatedAt: userProps.updatedAt,
    };
  }
}
