import { z } from "zod";

export const completeProfileSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
  body: z.object({
    email: z.email(),
    phone: z.string().min(1),
    document: z.string().min(1),
    name: z.string().min(1),
  }),
});

export type CompleteProfileHttpRequest = z.infer<typeof completeProfileSchema>;
