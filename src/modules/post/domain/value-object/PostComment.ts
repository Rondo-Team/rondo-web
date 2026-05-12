export interface PostComment {
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
}
