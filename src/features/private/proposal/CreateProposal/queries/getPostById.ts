import { getPostByIdUseCase } from "@/modules/post/PostModule";

export const getPostById = async (id: string) => {
  try {
    return await getPostByIdUseCase.run(id);
  } catch {
    return null;
  }
};
