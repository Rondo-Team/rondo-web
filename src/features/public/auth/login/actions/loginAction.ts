"use server";

import {
  LoginActionDTO,
  LoginSchema,
} from "@/features/public/auth/login/schemas/LoginSchema";

import { FormActionState } from "@/modules/shared/infrastructure/FormActionState";
import { loginUserUseCase } from "@/modules/user/UserModule";
import { validateFormData } from "@/utils/validateFormData";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

type LoginFormActionState = FormActionState<LoginActionDTO>;

export async function loginAction(
  prevState: LoginFormActionState,
  formData: FormData,
): Promise<LoginFormActionState | never> {
  const t = await getTranslations("loginPage");
  const tForm = await getTranslations("loginPage.loginForm");

  const [values, validationErrors] = validateFormData(
    LoginSchema(tForm),
    formData,
    t("loginFailed"),
  );

  if (validationErrors) {
    return {
      errors: validationErrors,
      success: false,
    } as LoginFormActionState;
  }

  const error = await loginUserUseCase
    .run(values.email, values.password)
    .catch(() => {
      return {
        errors: {},
        message: t("loginFailed"),
        success: false,
      } as LoginFormActionState;
    });

  if (error) return error;

  redirect("/home");
}
