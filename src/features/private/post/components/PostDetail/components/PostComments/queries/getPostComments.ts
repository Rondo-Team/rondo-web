import { getPostCommentsUseCase } from "@/modules/post/PostModule";

export const getPostComments = async (id: string) => {
  try {
    return await getPostCommentsUseCase.run(id);
  } catch {
    return null;
  }
};
