import { z } from "zod";
import { UserStatus } from "../../../../domain/user/enums/user-status.enum";

export const listUsersSchema = z.object({
  query: z
    .object({
      page: z.coerce.number().int().positive().optional(),
      perPage: z.coerce.number().int().positive().optional(),
      searchValue: z.string().optional(),
      status: z.enum(UserStatus).optional(),
    })
    .default({}),
});

export type ListUsersHttpRequest = z.infer<typeof listUsersSchema>;
