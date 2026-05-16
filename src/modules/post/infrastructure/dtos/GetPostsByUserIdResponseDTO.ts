export type GetPostsByUserIdResponseDTO = {
  id: string;
  title: string;
  description: string;
  favouritesCount: number;
  commentsCount: number;
  proposalsCount: number;
  createdAt: Date;
  user: {
    username: string;
    name: string;
    profilePicture: string;
  };
}[];
