"use server";

import {
  RegisterActionDTO,
  RegisterSchema,
} from "@/features/public/auth/register/schemas/RegisterSchema";

import { FormActionState } from "@/modules/shared/infrastructure/FormActionState";
import { registerUserUseCase } from "@/modules/user/UserModule";
import { validateFormData } from "@/utils/validateFormData";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type RegisterFormActionState = FormActionState<RegisterActionDTO>;

export async function registerAction(
  prevState: RegisterFormActionState,
  formData: FormData,
): Promise<RegisterFormActionState | never> {
  const t = await getTranslations("registerPage");

  const [values, validationErrors] = validateFormData(
    RegisterSchema,
    formData,
    t("registerFailed"),
  );

  if (validationErrors) {
    return {
      errors: validationErrors,
      success: false,
    } as RegisterFormActionState;
  }

  const id = uuidv4();

  const error = await registerUserUseCase
    .run(id, values.name, values.username, values.email, values.password)
    .catch(() => {
      return {
        errors: {},
        message: t("registerFailed"),
        success: false,
      } as RegisterFormActionState;
    });

  if (error) return error;

  redirect("/login");
}
