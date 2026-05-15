import { PostResume } from "@/modules/post/domain/value-object/PostResume";
import { GetPostsByCriteriaResponseDTO } from "@/modules/post/infrastructure/dtos/GetPostByCriteriaResponseDTO";
import { PaginatedResponse } from "@/modules/shared/pagination/domain/PaginatedResponse";

export const getPostsByCriteriaMapper = (
  dto: GetPostsByCriteriaResponseDTO,
): PaginatedResponse<PostResume> => {
  return {
    items: dto.items.map((post) => ({
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
    })),
    page: dto.page,
    limit: dto.limit,
    total: dto.total,
  };
};
