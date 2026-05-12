"use server";

import { likeCommentUseCase } from "@/modules/post/PostModule";
import { v4 as uuidv4 } from "uuid";

export const likeComment = async (commentId: string) => {
  try {
    const id = uuidv4();
    await likeCommentUseCase.run(id, commentId);
    return id;
  } catch {
    return null;
  }
};
