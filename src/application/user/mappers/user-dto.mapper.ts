import { RoleDtoMapper } from "../../access-control/role/mappers/role-dto.mapper";
import { UserEntity } from "../../../domain/user/entities/user.entity";
import { UserDto, UserWithRoleDto } from "../dtos/user.dto";
import { RoleEntity } from "../../../domain/access-control/role/entities/role.entity";

export class UserDtoMapper {
  static toDto(user: UserEntity): UserDto {
    const userProps = user.export();
    return {
      id: userProps.id,
      email: userProps.email.getValue(),
      name: userProps.name?.getValue(),
      phoneNumber: userProps.phoneNumber?.getValue(),
      documentNumber: userProps.documentNumber?.getValue(),
      status: userProps.status,
      avatarUrl: userProps.avatarUrl,
      isProfileCompleted: userProps.isProfileCompleted,
      createdAt: userProps.createdAt,
      updatedAt: userProps.updatedAt,
    };
  }

  static toWithRoleDto(user: UserEntity, role: RoleEntity): UserWithRoleDto {
    const userDto = this.toDto(user);
    return {
      ...userDto,
      role: RoleDtoMapper.toDto(role),
    };
  }
}
