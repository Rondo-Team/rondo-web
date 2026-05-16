import { getDraftsByUserUseCase } from "@/modules/draft/DraftModule";

export const getDraftsByUser = async () => {
  try {
    return await getDraftsByUserUseCase.run();
  } catch {
    return null;
  }
};
