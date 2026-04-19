import { Play } from "@/types/Play";

export type CreateDraftRequestDTO = {
  id: string;
  title: string;
  description: string;
  play: Play;
};
