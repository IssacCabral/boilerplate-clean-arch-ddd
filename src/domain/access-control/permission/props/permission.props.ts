import { Timestamps } from "../../../@shared/timestamps.shared";
import { PermissionIdentifier } from "../enums/permission-identifier.enum";

export interface PermissionProps extends Timestamps {
  id: string;
  identifier: PermissionIdentifier;
  description: string;
}
