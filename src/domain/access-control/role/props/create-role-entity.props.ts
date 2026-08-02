import { RoleProps } from "./role.props";

export type CreateRoleEntityProps = Omit<RoleProps, "createdAt" | "updatedAt">;
