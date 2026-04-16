import { ProposalStatus } from "@/types/ProposalStatus";

export interface ProposalResume {
  id: string;
  title: string;
  postTitle: string;
  status: ProposalStatus;
  createdAt: string;
}
