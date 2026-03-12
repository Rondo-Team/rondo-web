import { Play } from "@/types/Play";

export type GetTrendingPostResponseDTO = {
  id: string;
  title: string;
  description: string;
  favouritesCount: number;
  commentsCount: number;
  proposalsCount: number;
  createdAt: Date;
  tags: string[];
  play: Play;
  user: {
    username: string;
    name: string;
    profilePicture: string;
  };
};
