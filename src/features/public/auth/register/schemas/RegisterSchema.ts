import z from "zod";

export const RegisterSchema = (t: (arg: string) => string) =>
  z
    .object({
      name: z
        .string({ error: t("name.empty") })
        .max(30, { error: t("name.tooLong") })
        .min(2, { error: t("name.tooShort") })
        .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, { error: t("name.invalidChars") }),
      username: z
        .string({ error: t("username.empty") })
        .max(20, { error: t("username.tooLong") })
        .min(3, { error: t("username.tooShort") })
        .regex(/^[a-zA-Z0-9._]+$/, { error: t("username.invalidChars") }),
      email: z.email({ error: t("email.invalid") }),
      password: z
        .string({ error: t("password.empty") })
        .min(8, { error: t("password.tooShort") })
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|\\:;"'<>,.?/~`]).{8,}$/,
          { error: t("password.invalidChars") },
        ),
      passwordConfirm: z.string({ error: t("passwordConfirm.empty") }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      error: t("passwordConfirm.notMatch"),
    });

type RegisterSchemaType = ReturnType<typeof RegisterSchema>;
export type RegisterActionDTO = z.infer<RegisterSchemaType>;
