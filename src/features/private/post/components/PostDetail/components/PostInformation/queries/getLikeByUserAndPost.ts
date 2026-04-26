"use server";

import { getLikeByUserAndPostUseCase } from "@/modules/post/PostModule";

export const getLikeByUserAndPost = async (postId: string) => {
  try {
    return await getLikeByUserAndPostUseCase.run(postId);
  } catch {
    return null;
  }
};
