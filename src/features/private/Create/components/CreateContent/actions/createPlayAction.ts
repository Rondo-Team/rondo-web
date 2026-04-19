"use server";

import {
  CreatePlayActionDTO,
  CreatePlaySchema,
} from "@/features/private/Create/components/CreateContent/schemas/CreatePlaySchema";
import { FormActionState } from "@/modules/shared/infrastructure/FormActionState";
import { validateFormData } from "@/utils/validateFormData";
import { getTranslations } from "next-intl/server";

type CreatePlayFormActionState = FormActionState<CreatePlayActionDTO>;

export async function createPlayAction(
  prevState: CreatePlayFormActionState,
  formData: FormData,
): Promise<CreatePlayFormActionState> {
  const t = await getTranslations("createPage");
  const tForm = await getTranslations("createPage.createForm");

  const [values, validationErrors] = validateFormData(
    CreatePlaySchema(tForm),
    formData,
    t("createFailed"),
  );

  if (validationErrors) {
    return {
      success: false,
      errors: validationErrors,
    } as CreatePlayFormActionState;
  }

  try {
    console.dir(values, { depth: null });

    return {
      success: true,
      message: t("createSuccess"),
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : t("createFailed"),
    };
  }
}
