import { UserProfile } from "@/modules/user/domain/value-objects/UserProfile";
import { UserStats } from "@/modules/user/domain/value-objects/UserStats";

export const userStatsFromUserProfileMapper = (
  userProfile: UserProfile,
): UserStats => {
  return {
    postsCount: userProfile.postsCount,
    proposalsCount: userProfile.proposalsCount,
    favouritePostsCount: userProfile.favouritePostsCount,
    commentsCount: userProfile.commentsCount
  };
};
