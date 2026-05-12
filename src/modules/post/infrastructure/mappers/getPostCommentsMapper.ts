import { PostComment } from "@/modules/post/domain/value-object/PostComment";
import { GetPostCommentsResponseDTO } from "@/modules/post/infrastructure/dtos/GetPostCommentsResponseDTO";

export const getPostCommentsMapper = (
  dto: GetPostCommentsResponseDTO,
): PostComment[] => {
  return dto.map((comment) => ({
    id: comment.id,
    user: {
      username: comment.user.username,
      name: comment.user.name,
    },
    postId: comment.postId,
    message: comment.message,
    favouritesCount: comment.favouritesCount,
    createdAt: comment.createdAt,
    parentId: comment.parentId,
  }));
};
