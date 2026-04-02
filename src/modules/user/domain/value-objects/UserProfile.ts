import { UserRecentPlays } from "@/modules/user/domain/value-objects/UserRecentPlays";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  name: string;
  profilePicture: string;
  postsCount: number;
  proposalsCount: number;
  favouritePostsCount: number;
  commentsCount: number;
  createdAt: Date;
  usernameChangedAt: Date;
  recentlyViewedContent: UserRecentPlays;
}
