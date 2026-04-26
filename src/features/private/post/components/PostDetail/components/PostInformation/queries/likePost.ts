"use server";

import { likePostUseCase } from "@/modules/post/PostModule";
import { getUserIdFromCookie } from "@/utils/getUserIdFromCookie";

export const likePost = async (postId: string) => {
  try {
    const userId = await getUserIdFromCookie();
    if (!userId) return null;

    return await likePostUseCase.run(userId, postId);
  } catch {
    return null;
  }
};
