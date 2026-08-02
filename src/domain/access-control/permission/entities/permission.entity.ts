import { AbstractEntity } from "../../../@shared/abstract.shared";
import { CreatePermissionEntityProps } from "../props/create-permission-entity.props";
import { PermissionProps } from "../props/permission.props";

export class PermissionEntity extends AbstractEntity<PermissionProps> {
  static create(props: CreatePermissionEntityProps): PermissionEntity {
    const now = new Date();

    return new PermissionEntity({
      id: props.id,
      identifier: props.identifier,
      description: props.description,
      createdAt: now,
      updatedAt: now,
    });
  }

  static hydrate(props: PermissionProps): PermissionEntity {
    return new PermissionEntity(props);
  }
}
