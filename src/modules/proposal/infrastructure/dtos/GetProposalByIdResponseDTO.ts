import { Play } from "@/types/Play";

export type GetProposalByIdResponseDTO = {
  id: string;
  user: {
    username: string;
    name: string;
    profilePicture: string;
    id: string;
  };
  post: {
    id: string;
    title: string;
    username: string;
  };
  title: string;
  description: string;
  createdAt: string;
  play: Play;
  status: string;
};
