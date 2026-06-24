"use server";

import {
  UpdateProposalActionDTO,
  UpdateProposalSchema,
} from "@/features/private/edit/proposal/components/EditProposalContent/schemas/UpdateProposalSchema";
import { updateProposalUseCase } from "@/modules/proposal/ProposalModule";
import { FormActionState } from "@/modules/shared/infrastructure/FormActionState";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { validateFormData } from "@/utils/validateFormData";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

type UpdateProposalFormActionState = FormActionState<UpdateProposalActionDTO>;

export async function updateProposalAction(
  proposalId: string,
  prevState: UpdateProposalFormActionState,
  formData: FormData,
): Promise<UpdateProposalFormActionState | never> {
  const t = await getTranslations("editPage.post");

  const [values, validationErrors] = validateFormData(
    UpdateProposalSchema(t),
    formData,
    t("updateFailed"),
  );

  if (validationErrors) {
    return {
      success: false,
      errors: validationErrors,
    } as UpdateProposalFormActionState;
  }

  const error = await updateProposalUseCase
    .run(proposalId, values.title, values.description, values.play)
    .catch(() => {
      return {
        errors: {},
        message: t("updateFailed"),
        success: false,
      } as UpdateProposalFormActionState;
    });

  if (error) return error;
  redirect(`${AppSectionsRoutes.PROPOSAL}/${proposalId}`);
}
