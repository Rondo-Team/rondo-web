export type UserProfileResponseDTO = {
  id: string;
  email: string;
  username: string;
  name: string;
  profilePicture: string;
  postsCount: number;
  proposalsCount: number;
  favouritePostsCount: number;
  commentsCount: number;
  createdAt: string;
  usernameChangedAt: string;
  recentlyViewedContent: {
    id: string;
    type: string;
    title: string;
    openedAt: Date;
  }[];
};
