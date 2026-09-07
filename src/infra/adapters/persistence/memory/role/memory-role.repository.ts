import { RoleEntity } from "../../../../../domain/access-control/role/entities/role.entity";
import { RoleRepository } from "../../../../../domain/access-control/role/repositories/role.repository";
import { MemoryRoleMapper, MemoryRoleRecord } from "./memory-role.mapper";

export class MemoryRoleRepository implements RoleRepository {
  private roles: MemoryRoleRecord[] = [];

  create(role: RoleEntity): Promise<void> {
    const record = MemoryRoleMapper.toPersistence(role);
    this.roles.push(record);
    return Promise.resolve();
  }

  findById(id: string): Promise<RoleEntity | null> {
    const record = this.roles.find((role) => role.id === id);
    return record
      ? Promise.resolve(MemoryRoleMapper.toDomain(record))
      : Promise.resolve(null);
  }
}
