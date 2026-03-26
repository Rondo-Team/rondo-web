import { CommunityHighlight } from "@/modules/post/domain/value-object/CommunityHighlight";
import { GetCommunityHighlightsResponseDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsResponseDTO";
import { PaginatedResponse } from "@/modules/shared/pagination/domain/PaginatedResponse";

export const getCommunityHighlightsMapper = (
  dto: GetCommunityHighlightsResponseDTO,
): PaginatedResponse<CommunityHighlight> => {
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
