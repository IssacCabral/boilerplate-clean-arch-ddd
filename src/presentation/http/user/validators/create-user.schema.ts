import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    roleId: z.string().min(1),
  }),
});

export type CreateUserHttpRequest = z.infer<typeof createUserSchema>;
