import { PermissionEntity } from "../../../../domain/access-control/permission/entities/permission.entity";
import { RoleEntity } from "../../../../domain/access-control/role/entities/role.entity";
import { RoleIdentifier } from "../../../../domain/access-control/role/enums/role-identifier.enum";
import {
  MemoryPermissionMapper,
  MemoryPermissionRecord,
} from "./memory-permission.mapper";

export type MemoryRoleRecord = {
  id: string;
  identifier: RoleIdentifier;
  description: string;
  permissions?: MemoryPermissionRecord[];
  createdAt: Date;
  updatedAt: Date;
};

export class MemoryRoleMapper {
  static toEntity(raw: MemoryRoleRecord): RoleEntity {
    let permissions: MemoryPermissionRecord[] | undefined;

    if (raw.permissions) {
      permissions = raw.permissions.map((permission) =>
        MemoryPermissionMapper.toEntity(permission).export(),
      );
    }

    return RoleEntity.hydrate({
      id: raw.id,
      identifier: raw.identifier,
      description: raw.description,
      permissions,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(role: RoleEntity): MemoryRoleRecord {
    const roleProps = role.export();
    return {
      id: roleProps.id,
      identifier: roleProps.identifier,
      description: roleProps.description,
      permissions: roleProps.permissions?.map((permission) =>
        MemoryPermissionMapper.toPersistence(
          PermissionEntity.hydrate(permission),
        ),
      ),
      createdAt: roleProps.createdAt,
      updatedAt: roleProps.updatedAt,
    };
  }
}
