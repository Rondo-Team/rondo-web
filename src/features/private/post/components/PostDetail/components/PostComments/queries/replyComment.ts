"use server";

import { replyCommentUseCase } from "@/modules/post/PostModule";
import { v4 as uuidv4 } from "uuid";

export const replyPost = async (
  postId: string,
  parentId: string,
  message: string,
) => {
  try {
    const id = uuidv4();
    await replyCommentUseCase.run(id, parentId, postId, message);
    return id;
  } catch {
    return null;
  }
};
