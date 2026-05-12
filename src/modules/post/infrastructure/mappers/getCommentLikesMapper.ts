import { CommentFavourite } from "@/modules/post/domain/value-object/CommentFavourite";
import { GetUserCommentLikesByPostResponseDTO } from "@/modules/post/infrastructure/dtos/GetUserCommentLikesByPostResponseDTO";

export const getCommentLikesMapper = (
  dto: GetUserCommentLikesByPostResponseDTO,
): CommentFavourite[] => {
  return dto.map((commentLike) => ({
    id: commentLike.id,
    userId: commentLike.userId,
    commentId: commentLike.commentId,
    createdAt: commentLike.createdAt,
  }));
};
