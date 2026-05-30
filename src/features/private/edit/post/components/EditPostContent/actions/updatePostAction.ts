"use server";

import {
  UpdatePostActionDTO,
  UpdatePostSchema,
} from "@/features/private/edit/post/components/EditPostContent/schemas/UpdatePostSchema";
import { updatePostUseCase } from "@/modules/post/PostModule";
import { FormActionState } from "@/modules/shared/infrastructure/FormActionState";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { validateFormData } from "@/utils/validateFormData";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

type UpdatePostFormActionState = FormActionState<UpdatePostActionDTO>;

export async function updatePostAction(
  postId: string,
  prevState: UpdatePostFormActionState,
  formData: FormData,
): Promise<UpdatePostFormActionState | never> {
  const t = await getTranslations("editPage.post");

  const [values, validationErrors] = validateFormData(
    UpdatePostSchema(t),
    formData,
    t("updateFailed"),
  );

  if (validationErrors) {
    return {
      success: false,
      errors: validationErrors,
    } as UpdatePostFormActionState;
  }

  const error = await updatePostUseCase
    .run(postId, values.title, values.description, values.tags, values.play)
    .catch(() => {
      return {
        errors: {},
        message: t("updateFailed"),
        success: false,
      } as UpdatePostFormActionState;
    });

  if (error) return error;
  redirect(`${AppSectionsRoutes.POST}/${postId}`);
}
