import z from "zod";

export const LoginSchema = (t: (arg: string) => string) =>
  z.object({
    email: z.email({ error: t("email.invalid") }).nonempty(),
    password: z.string().min(6, { error: t("password.invalid") }),
  });

type LoginSchemaType = ReturnType<typeof LoginSchema>;
export type LoginActionDTO = z.infer<LoginSchemaType>;
