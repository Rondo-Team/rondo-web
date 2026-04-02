import { UserProfile } from "@/modules/user/domain/value-objects/UserProfile";
import { UserProfileResponseDTO } from "@/modules/user/infrastructure/dtos/UserProfileResponseDTO";
import { RecentlyViewedItemTypes } from "@/types/RecentlyViewedItemsTypes";

export const getUserProfileMapper = (
  dto: UserProfileResponseDTO,
): UserProfile => {
  return {
    id: dto.id,
    email: dto.email,
    username: dto.username,
    name: dto.name,
    profilePicture: dto.profilePicture,
    postsCount: dto.postsCount,
    proposalsCount: dto.proposalsCount,
    favouritePostsCount: dto.favouritePostsCount,
    commentsCount: dto.commentsCount,
    createdAt: new Date(dto.createdAt),
    usernameChangedAt: new Date(dto.createdAt),
    recentlyViewedContent: dto.recentlyViewedContent.map((item) => ({
      id: item.id,
      type: item.type as RecentlyViewedItemTypes,
      openedAt: item.openedAt,
      title: item.title
    })),
  };
};
