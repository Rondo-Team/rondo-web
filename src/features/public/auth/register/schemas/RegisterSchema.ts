import z from "zod";

export const RegisterSchema = z
  .object({
    name: z
      .string()
      .max(30)
      .min(2)
      .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/),
    username: z
      .string()
      .max(20)
      .min(3)
      .regex(/^[a-zA-Z0-9._]+$/),
    email: z.email(),
    password: z
      .string()
      .min(8)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/,
      ),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
  });
export type RegisterActionDTO = z.output<typeof RegisterSchema>;
