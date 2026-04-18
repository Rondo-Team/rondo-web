import { getUserStatsUseCase } from "@/modules/user/UserModule";

export const getUserStats = async () => {
  try {
    return await getUserStatsUseCase.run();
  } catch {
    return null;
  }
};
