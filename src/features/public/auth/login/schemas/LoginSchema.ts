import z from "zod";

export const LoginSchema = z.object({
  email: z.email().nonempty(),
  password: z.string().min(6),
});

export type LoginActionDTO = z.output<typeof LoginSchema>;
