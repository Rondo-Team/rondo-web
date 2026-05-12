import { PostComments } from "@/features/private/post/components/PostDetail/components/PostComments";
import { PostInformation } from "@/features/private/post/components/PostDetail/components/PostInformation";
import { getPostById } from "@/features/private/post/components/PostDetail/queries/getPostById";
import { getUserIdFromCookie } from "@/utils/getUserIdFromCookie";
import styles from "./PostDetail.module.css";

interface PostDetailPropos {
  id: string;
}

export const PostDetail = async ({ id }: PostDetailPropos) => {
  const post = await getPostById(id);
  if (!post) return <div>could not fetch post</div>;
  const userOwnsPost = post.user.id === (await getUserIdFromCookie());
  return (
    <div className={styles.postDetailContainer}>
      <PostInformation post={post} userOwnsPost={userOwnsPost} />
      <div className={styles.postComments}>
        <h1>Comments ({post.commentsCount})</h1>
        <PostComments postId={post.id} />
      </div>
    </div>
  );
};
