import { getPostById } from "@/features/private/edit/post/queries/getPostById";
import { getUserIdFromCookie } from "@/utils/getUserIdFromCookie";
import { notFound } from "next/navigation";
import { EditPostContent } from "./components/EditPostContent";

interface EditPostProps {
  id: string;
}

export const EditPost = async ({ id }: EditPostProps) => {
  const post = await getPostById(id);
  const userOwnsPost = post?.user.id === (await getUserIdFromCookie());
  if (!post || !userOwnsPost) notFound();

  return <EditPostContent post={post} />;
};
