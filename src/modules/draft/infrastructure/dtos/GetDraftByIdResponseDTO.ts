import { Play } from "@/types/Play";

export type GetDraftByIdResponseDTO = {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  play: Play;
  userId: string;
};
