import { Play } from "@/types/Play";

export type CreateProposalRequestDTO = {
  id: string;
  postId: string;
  title: string;
  description: string;
  play: Play;
};
