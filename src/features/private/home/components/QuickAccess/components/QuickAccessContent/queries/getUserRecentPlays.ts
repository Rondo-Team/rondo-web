import { getUserRecentPlaysUseCase } from "@/modules/user/UserModule";

export const getUserRecentPlays = async () => {
  try {
    return getUserRecentPlaysUseCase.run();
  } catch {
    return null;
  }
};
