import { RoleRepository } from "../../../../../../domain/access-control/role/repositories/role.repository";
import { MemoryRoleRepository } from "../../../../../../infra/adapters/persistence/memory/role/memory-role.repository";

const roleRepository = new MemoryRoleRepository();

export function makeRoleRepository(): RoleRepository {
  return roleRepository;
}
