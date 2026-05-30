"use server";

import { deleteDraftByIdUseCase } from "@/modules/draft/DraftModule";

export const deleteDraft = async (id: string) => {
  try {
    return await deleteDraftByIdUseCase.run(id);
  } catch {
    return null;
  }
};
