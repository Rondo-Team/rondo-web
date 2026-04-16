import { Play } from "@/types/Play";
import { ProposalStatus } from "@/types/ProposalStatus";

export type GetAllProposalByUserIdResponseDTO = {
  id: string;
  user: {
    username: string;
    name: string;
    profilePicture: string;
  };
  post: {
    id: string;
    title: string;
  };
  title: string;
  description: string;
  createdAt: string;
  play: Play;
  status: ProposalStatus;
}[];
