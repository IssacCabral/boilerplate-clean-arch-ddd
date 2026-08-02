import { AbstractEntity } from "../../../@shared/abstract.shared";
import { RoleIdentifier } from "../enums/role-identifier.enum";
import { CreateRoleEntityProps } from "../props/create-role-entity.props";
import { RoleProps } from "../props/role.props";

export class RoleEntity extends AbstractEntity<RoleProps> {
  static create(props: CreateRoleEntityProps): RoleEntity {
    const now = new Date();
    return new RoleEntity({
      id: props.id,
      identifier: props.identifier,
      description: props.description,
      permissions: props.permissions,
      createdAt: now,
      updatedAt: now,
    });
  }

  static hydrate(props: RoleProps): RoleEntity {
    return new RoleEntity(props);
  }

  isAdmin(): boolean {
    return this.props.identifier === RoleIdentifier.Admin;
  }
}
