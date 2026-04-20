import { getUserNavBarInfoUseCase } from "@/modules/user/UserModule";

export const getUserNavBarInfo = async () => {
  try {
    return await getUserNavBarInfoUseCase.run();
  } catch {
    return null;
  }
};
