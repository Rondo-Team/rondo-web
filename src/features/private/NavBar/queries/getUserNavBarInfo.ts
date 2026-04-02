import { getUserNavBarInfoUseCase } from "@/modules/user/UserModule";

export const getUserNavBarInfo = async () => {
  try {
    return getUserNavBarInfoUseCase.run();
  } catch {
    return null;
  }
};
