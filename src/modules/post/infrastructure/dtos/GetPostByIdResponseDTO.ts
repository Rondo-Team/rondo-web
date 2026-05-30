import { Play } from "@/types/Play";

export type GetPostByIdResponseDTO = {
  id: string;
  title: string;
  description: string;
  favouritesCount: number;
  commentsCount: number;
  proposalsCount: number;
  createdAt: string;
  tags: string[];
  play: Play;
  user: {
    username: string;
    name: string;
    profilePicture: string;
    id: string;
  };
};
