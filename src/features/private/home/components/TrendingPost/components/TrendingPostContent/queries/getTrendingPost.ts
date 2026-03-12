import { getTrendingPostUseCase } from "@/modules/post/PostModule";

export const getTrendingPost = async () => {
  try {
    return await getTrendingPostUseCase.run();
  } catch {
    return null;
  }
};
