"use server";

import { likePostUseCase } from "@/modules/post/PostModule";
import { v4 as uuidv4 } from "uuid";

export const likePost = async (postId: string) => {
  try {
    const id = uuidv4();

    return await likePostUseCase.run(id, postId);
  } catch {
    return null;
  }
};
