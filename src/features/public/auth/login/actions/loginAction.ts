"use server";

import {
  LoginActionDTO,
  LoginSchema,
} from "@/features/public/auth/login/schemas/LoginSchema";
import { FormActionState } from "@/modules/shared/infrastructure/FormActionState";
import { LoginUser } from "@/modules/user/application/use-cases/LoginUser";
import { HttpUserRepository } from "@/modules/user/infrastructure/repositories/HttpUserRepository";
import { validateFormData } from "@/utils/validateFormData";

type LoginFormActionState = FormActionState<LoginActionDTO>;

export async function loginAction(
  prevState: LoginFormActionState,
  formData: FormData,
): Promise<LoginFormActionState> {
  const userRepository = new HttpUserRepository();
  const loginUseCase = new LoginUser(userRepository);

  const [values, validationErrors] = validateFormData(
    LoginSchema,
    formData,
    // Translated message??
    "Login Failed",
  );

  if (validationErrors) {
    return {
      errors: validationErrors,
      message: "Form Validation Errors",
      success: false,
    } as LoginFormActionState;
  }

  const error = await loginUseCase
    .run(values.email, values.password)
    .catch(() => {
      return {
        errors: {},
        message: "Login Failed",
        success: false,
      } as LoginFormActionState;
    });

  if (error) return error;

  return { success: true, message: "Login successful!" };
}
