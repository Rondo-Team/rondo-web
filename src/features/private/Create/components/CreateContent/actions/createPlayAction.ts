"use server";

import {
  CreatePlayActionDTO,
  CreatePlaySchema,
} from "@/features/private/Create/components/CreateContent/schemas/CreatePlaySchema";
import { createDraftUseCase } from "@/modules/draft/DraftModule";
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
  const intentValue = formData.getAll("intent").at(-1);
  const intent = typeof intentValue === "string" ? intentValue : null;

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

  switch (intent) {
    case "post": {
      const postError = await createPostUseCase
        .run(id, values.title, values.description, values.tags, values.play)
        .catch(() => {
          return {
            errors: {},
            message: t("createFailed"),
            success: false,
          } as CreatePlayFormActionState;
        });

      if (postError) return postError;
      redirect(`${AppSectionsRoutes.POST}/${id}`);
    }

    case "draft": {
      const draftError = await createDraftUseCase
        .run(id, values.title, values.description, values.play)
        .catch(() => {
          return {
            errors: {},
            message: t("createFailed"),
            success: false,
          } as CreatePlayFormActionState;
        });

      if (draftError) return draftError;
      redirect(`${AppSectionsRoutes.DRAFT}/${id}`);
    }

    default:
      return {
        errors: {},
        message: t("createFailed"),
        success: false,
      } as CreatePlayFormActionState;
  }
}
