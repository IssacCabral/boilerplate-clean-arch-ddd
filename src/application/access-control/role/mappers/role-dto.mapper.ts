import { RoleEntity } from "../../../../domain/access-control/role/entities/role.entity";
import { RoleDto } from "../dtos/role.dto";

export class RoleDtoMapper {
  static toDto(role: RoleEntity): RoleDto {
    const roleProps = role.export();
    return {
      id: roleProps.id,
      identifier: roleProps.identifier,
      description: roleProps.description,
      createdAt: roleProps.createdAt,
      updatedAt: roleProps.updatedAt,
    };
  }
}
