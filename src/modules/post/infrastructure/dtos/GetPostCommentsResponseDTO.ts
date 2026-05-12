export type GetPostCommentsResponseDTO = {
  id: string;
  user: {
    username: string;
    name: string;
  };
  postId: string;
  message: string;
  favouritesCount: number;
  createdAt: string;
  parentId: string | null;
}[];
