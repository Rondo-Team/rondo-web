import { getTrendingPostUseCase } from "@/modules/post/PostModule";

export const getTrendingPost = async () => {
  return await getTrendingPostUseCase.run();
};
