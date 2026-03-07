import { TrendingPost } from "@/modules/post/domain/value-object/TrendingPost";
import { GetTrendingPostResponseDTO } from "@/modules/post/infrastructure/dtos/GetTrendingPostResponseDTO";

export const getTrendingPostMapper = (
  dto: GetTrendingPostResponseDTO,
): TrendingPost => {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    favouritesCount: dto.favouritesCount,
    commentsCount: dto.commentsCount,
    proposalsCount: dto.proposalsCount,
    createdAt: dto.createdAt,
    tags: dto.tags,
    play: dto.play,
    user: {
      username: dto.user.username,
      profilePicture: dto.user.profilePicture,
    },
  };
};
