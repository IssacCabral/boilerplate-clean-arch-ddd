import { PermissionProps } from "./permission.props";

export type CreatePermissionEntityProps = Omit<
  PermissionProps,
  "createdAt" | "updatedAt"
>;
