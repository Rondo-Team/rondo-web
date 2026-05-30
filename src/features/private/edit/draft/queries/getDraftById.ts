import { getDraftByIdUseCase } from "@/modules/draft/DraftModule";

export const getDraftById = async (id: string) => {
  try {
    return await getDraftByIdUseCase.run(id);
  } catch {
    return null;
  }
};
