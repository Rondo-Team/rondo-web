import { TacticBoard } from "@/components/TacticBoard";
import { TitleSubtitle } from "@/components/TitleSubtitle";
import { UserProfile } from "@/components/UserProfile";
import { getPostById } from "@/features/private/post/components/PostDetail/queries/getPostById";

interface PostDetailPropos {
  id: string;
}

export const PostDetail = async ({ id }: PostDetailPropos) => {
  const post = await getPostById(id);
  if (!post) return <div>could not fetch post</div>;
  return (
    <div>
      <TitleSubtitle title={post.title} subtitle={post.description} />
      <UserProfile name={post.user.name} username={post.user.username} />
      <TacticBoard readOnly play={post.play} />
    </div>
  );
};
