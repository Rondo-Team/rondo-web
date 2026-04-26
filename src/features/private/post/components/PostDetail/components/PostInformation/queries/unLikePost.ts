"use server";

import { unLikePostUseCase } from "@/modules/post/PostModule";

export const unLikePost = async (id: string) => {
  try {
    return await unLikePostUseCase.run(id);
  } catch {
    return null;
  }
};
