import { CommentsContainer } from "@/features/private/post/components/PostDetail/components/PostComments/components/CommentsContainer/CommentsContainer";
import { commentPost } from "@/features/private/post/components/PostDetail/components/PostComments/queries/commentPost";
import { getPostComments } from "@/features/private/post/components/PostDetail/components/PostComments/queries/getPostComments";
import { getUserCommentLikesByPostId } from "@/features/private/post/components/PostDetail/components/PostComments/queries/getUserCommentLikesByPostId";
import { likeComment } from "@/features/private/post/components/PostDetail/components/PostComments/queries/likeComment";
import { replyPost } from "@/features/private/post/components/PostDetail/components/PostComments/queries/replyComment";
import { unLikeComment } from "@/features/private/post/components/PostDetail/components/PostComments/queries/unlikeComment";
import { capitalizeText } from "@/utils/capitalizeText";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { getLocale } from "next-intl/server";

interface PostCommentsProps {
  postId: string;
}

export const PostComments = async ({ postId }: PostCommentsProps) => {
  const locale = await getLocale();

  const handleCommentSubmit = async (message: string) => {
    "use server";
    return await commentPost(postId, message);
  };

  const handleReplySubmit = async ({
    parentId,
    replyText,
  }: {
    parentId: string;
    replyText: string;
  }) => {
    "use server";
    return await replyPost(postId, parentId, replyText);
  };

  const handleLikeCommentSubmit = async (commentId: string) => {
    "use server";
    return await likeComment(commentId);
  };

  const handleUnLikeCommentSubmit = async (favouriteId: string) => {
    "use server";
    return await unLikeComment(favouriteId);
  };

  const [comments, userCommentLikes] = await Promise.all([
    getPostComments(postId),
    getUserCommentLikesByPostId(postId),
  ]);

  if (!comments) return <div>Could not fetch comments </div>;

  const commentFavouriteIdByCommentId = (userCommentLikes ?? []).reduce<
    Record<string, string>
  >((acc, like) => {
    acc[like.commentId] = like.id;
    return acc;
  }, {});

  const commentsWithFormattedDate = comments.map((comment) => ({
    ...comment,
    createdAt: capitalizeText(formatRelativeDate(new Date(comment.createdAt), locale)),
  }));
  return (
    <CommentsContainer
      comments={commentsWithFormattedDate}
      onReplySubmit={handleReplySubmit}
      onCommentSubmit={handleCommentSubmit}
      onLikeCommentSubmit={handleLikeCommentSubmit}
      onUnLikeCommentSubmit={handleUnLikeCommentSubmit}
      commentFavouriteIdByCommentId={commentFavouriteIdByCommentId}
    />
  );
};
