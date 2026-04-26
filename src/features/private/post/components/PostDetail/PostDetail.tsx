import { PostInformation } from "@/features/private/post/components/PostDetail/components/PostInformation";
import { getPostById } from "@/features/private/post/components/PostDetail/queries/getPostById";

interface PostDetailPropos {
  id: string;
}

export const PostDetail = async ({ id }: PostDetailPropos) => {
  const post = await getPostById(id);
  if (!post) return <div>could not fetch post</div>;
  return <PostInformation post={post} />;
};
