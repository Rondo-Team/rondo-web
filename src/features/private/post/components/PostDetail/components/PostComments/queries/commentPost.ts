"use server";

import { commentPostUseCase } from "@/modules/post/PostModule";
import { v4 as uuidv4 } from "uuid";

export const commentPost = async (postId: string, message: string) => {
  try {
    const id = uuidv4();
    await commentPostUseCase.run(id, postId, message);
    return id;
  } catch {
    return null;
  }
};
