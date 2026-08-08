import { Timestamps } from "../../../../domain/@shared/timestamps.shared";
import { PermissionEntity } from "../../../../domain/access-control/permission/entities/permission.entity";
import { PermissionIdentifier } from "../../../../domain/access-control/permission/enums/permission-identifier.enum";

export interface PermissionDto extends Timestamps {
  id: string;
  identifier: PermissionIdentifier;
  description: string;
}

export class PermissionDtoMapper {
  static toDto(permission: PermissionEntity): PermissionDto {
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
