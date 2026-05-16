"use server";

import { getPostsByUserIdUseCase } from "@/modules/post/PostModule";
import { getUserIdFromCookie } from "@/utils/getUserIdFromCookie";

export const getUserPosts = async () => {
  try {
    const userId = await getUserIdFromCookie();
    if (!userId) throw new Error();
    return await getPostsByUserIdUseCase.run(userId);
  } catch {
    return null;
  }
};
