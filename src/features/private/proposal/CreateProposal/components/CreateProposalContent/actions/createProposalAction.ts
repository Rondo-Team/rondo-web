"use server";

import {
  CreateProposalActionDTO,
  CreateProposalSchema,
} from "@/features/private/proposal/CreateProposal/components/CreateProposalContent/schemas/CreateProposalSchema";
import { createProposalUseCase } from "@/modules/proposal/ProposalModule";
import { FormActionState } from "@/modules/shared/infrastructure/FormActionState";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { validateFormData } from "@/utils/validateFormData";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

type CreateProposalFormActionState = FormActionState<CreateProposalActionDTO>;

export async function createProposalAction(
  postId: string,
  prevState: CreateProposalFormActionState,
  formData: FormData,
): Promise<CreateProposalFormActionState | never> {
  const t = await getTranslations("createProposal");
  const tForm = await getTranslations("createProposal.createForm");

  const [values, validationErrors] = validateFormData(
    CreateProposalSchema(tForm),
    formData,
    t("createFailed"),
  );

  if (validationErrors) {
    console.log(validationErrors);
    return {
      success: false,
      errors: validationErrors,
    } as CreateProposalFormActionState;
  }

  const id = uuidv4();

  const error = await createProposalUseCase
    .run(id, postId, values.title, values.description, values.play)
    .catch(() => {
      return {
        errors: {},
        message: t("createFailed"),
        success: false,
      } as CreateProposalFormActionState;
    });

  if (error) return error;
  redirect(`${AppSectionsRoutes.PROPOSAL}/${id}`);
}
