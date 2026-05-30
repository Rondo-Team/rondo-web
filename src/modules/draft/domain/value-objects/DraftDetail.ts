import { Play } from "@/types/Play";

export interface DraftDetail {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  play: Play;
  userId: string;
}
