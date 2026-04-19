import { Play } from "@/types/Play";

export type CreatePostRequestDTO = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  play: Play;
};
