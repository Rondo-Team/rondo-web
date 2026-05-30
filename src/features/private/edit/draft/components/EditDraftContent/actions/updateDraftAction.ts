"use server";

import {
  UpdateDraftActionDTO,
  UpdateDraftSchema,
} from "@/features/private/edit/draft/components/EditDraftContent/schemas/UpdateDraftSchema";
import { updateDraftUseCase } from "@/modules/draft/DraftModule";
import { FormActionState } from "@/modules/shared/infrastructure/FormActionState";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { validateFormData } from "@/utils/validateFormData";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

type UpdateDraftFormActionState = FormActionState<UpdateDraftActionDTO>;

export async function updateDraftAction(
  draftId: string,
  prevState: UpdateDraftFormActionState,
  formData: FormData,
): Promise<UpdateDraftFormActionState | never> {
  const t = await getTranslations("editPage.draft");

  const [values, validationErrors] = validateFormData(
    UpdateDraftSchema(t),
    formData,
    t("updateFailed"),
  );

  if (validationErrors) {
    return {
      success: false,
      errors: validationErrors,
    } as UpdateDraftFormActionState;
  }

  const error = await updateDraftUseCase
    .run(draftId, values.title, values.description, values.play)
    .catch(() => {
      return {
        errors: {},
        message: t("updateFailed"),
        success: false,
      } as UpdateDraftFormActionState;
    });

  if (error) return error;
  redirect(`${AppSectionsRoutes.DRAFT}/${draftId}`);
}
