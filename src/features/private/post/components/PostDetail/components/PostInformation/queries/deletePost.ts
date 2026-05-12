"use server";

import { deletePostUseCase } from "@/modules/post/PostModule";

export const deletePost = async (id: string) => {
  try {
    return await deletePostUseCase.run(id);
  } catch {
    return null;
  }
};
