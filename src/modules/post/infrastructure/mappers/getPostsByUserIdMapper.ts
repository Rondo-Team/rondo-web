import { PostResume } from "@/modules/post/domain/value-object/PostResume";
import { GetPostsByUserIdResponseDTO } from "@/modules/post/infrastructure/dtos/GetPostsByUserIdResponseDTO";

export const getPostsByUserIdMapper = (
  dto: GetPostsByUserIdResponseDTO,
): PostResume[] => {
  return dto.map((post) => ({
    id: post.id,
    title: post.title,
    description: post.description,
    favouritesCount: post.favouritesCount,
    commentsCount: post.commentsCount,
    proposalsCount: post.proposalsCount,
    createdAt: post.createdAt,
    user: {
      username: post.user.username,
      name: post.user.name,
      profilePicture: post.user.profilePicture,
    },
  }));
};
