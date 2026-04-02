import { UserNavBarInfo } from "@/modules/user/domain/value-objects/UserNavBarInfo";
import { UserProfile } from "@/modules/user/domain/value-objects/UserProfile";

export const userNavBarInfoFromUserProfileMapper = (
  userProfile: UserProfile,
): UserNavBarInfo => {
  return {
    name: userProfile.name,
    username: userProfile.username,
  };
};
