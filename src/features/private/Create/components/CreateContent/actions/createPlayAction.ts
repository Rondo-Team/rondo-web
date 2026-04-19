"use server";

import {
  CreatePlayActionDTO,
  CreatePlaySchema,
} from "@/features/private/Create/components/CreateContent/schemas/CreatePlaySchema";
import { createPostUseCase } from "@/modules/post/PostModule";
import { FormActionState } from "@/modules/shared/infrastructure/FormActionState";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { validateFormData } from "@/utils/validateFormData";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type CreatePlayFormActionState = FormActionState<CreatePlayActionDTO>;

export async function createPlayAction(
  prevState: CreatePlayFormActionState,
  formData: FormData,
): Promise<CreatePlayFormActionState | never> {
  const t = await getTranslations("createPage");
  const tForm = await getTranslations("createPage.createForm");
  const intent = formData.get("intent");

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

  const id = uuidv4();

  const error = await createPostUseCase
    .run(id, values.title, values.description, values.tags, values.play)
    .catch(() => {
      return {
        errors: {},
        message: t("createFailed"),
        success: false,
      } as CreatePlayFormActionState;
    });

  if (error) return error;

  if (intent === "draft") {
    // TODO: implement draft saving
    return { success: true, message: t("draftSaved") };
  }

  redirect(`${AppSectionsRoutes.POST}/${id}`);
}
