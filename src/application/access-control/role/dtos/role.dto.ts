import { PermissionEntity } from "../../../../domain/access-control/permission/entities/permission.entity";
import { RoleEntity } from "../../../../domain/access-control/role/entities/role.entity";
import { RoleIdentifier } from "../../../../domain/access-control/role/enums/role-identifier.enum";
import {
  PermissionDto,
  PermissionDtoMapper,
} from "../../permission/dtos/permission.dto";

export interface RoleDto {
  id: string;
  identifier: RoleIdentifier;
  description: string;
  permissions?: PermissionDto[];
  createdAt: Date;
  updatedAt: Date;
}

export class RoleDtoMapper {
  static toDto(role: RoleEntity): RoleDto {
    const roleProps = role.export();
    let permissions: PermissionDto[] | undefined;

    if (roleProps.permissions) {
      permissions = roleProps.permissions.map((permission) =>
        PermissionDtoMapper.toDto(PermissionEntity.hydrate(permission)),
      );
    }

    return {
      id: roleProps.id,
      identifier: roleProps.identifier,
      description: roleProps.description,
      permissions,
      createdAt: roleProps.createdAt,
      updatedAt: roleProps.updatedAt,
    };
  }
}
