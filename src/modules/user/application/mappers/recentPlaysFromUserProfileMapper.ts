import { UserProfile } from "@/modules/user/domain/value-objects/UserProfile";
import { UserRecentPlays } from "@/modules/user/domain/value-objects/UserRecentPlays";

export const recentPlaysFromUserProfileMapper = (
  userProfile: UserProfile,
): UserRecentPlays => {
  return userProfile.recentlyViewedContent;
};
