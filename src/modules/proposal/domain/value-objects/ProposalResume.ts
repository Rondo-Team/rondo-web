import { ProposalStatus } from "@/types/ProposalStatus";

export interface ProposalResume {
  id: string;
  title: string;
  postTitle: string;
  username: string;
  status: ProposalStatus;
  createdAt: string;
}
