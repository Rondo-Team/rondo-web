"use server";

import { unLikeCommmentUseCase } from "@/modules/post/PostModule";

export const unLikeComment = async (id: string) => {
  try {
    await unLikeCommmentUseCase.run(id);
    return true;
  } catch {
    return null;
  }
};
