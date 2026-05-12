import { getUserCommentLikesByPostUseCase } from "@/modules/post/PostModule";

export const getUserCommentLikesByPostId = async (postId: string) => {
  try {
    return await getUserCommentLikesByPostUseCase.run(postId);
  } catch {
    return null;
  }
};
