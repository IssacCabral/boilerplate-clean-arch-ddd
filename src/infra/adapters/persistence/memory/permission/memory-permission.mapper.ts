import { PermissionEntity } from "../../../../../domain/access-control/permission/entities/permission.entity";
import { PermissionIdentifier } from "../../../../../domain/access-control/permission/enums/permission-identifier.enum";

export type MemoryPermissionRecord = {
  id: string;
  identifier: PermissionIdentifier;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export class MemoryPermissionMapper {
  static toDomain(raw: MemoryPermissionRecord): PermissionEntity {
    return PermissionEntity.hydrate({
      id: raw.id,
      identifier: raw.identifier,
      description: raw.description,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  static toPersistence(permission: PermissionEntity): MemoryPermissionRecord {
    const permissionProps = permission.export();
    return {
      id: permissionProps.id,
      identifier: permissionProps.identifier,
      description: permissionProps.description,
      createdAt: permissionProps.createdAt,
      updatedAt: permissionProps.updatedAt,
    };
  }
}
