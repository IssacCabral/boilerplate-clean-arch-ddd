import { RoleEntity } from "../entities/role.entity";

export interface RoleRepository {
  findById(id: string): Promise<RoleEntity | null>;
}
