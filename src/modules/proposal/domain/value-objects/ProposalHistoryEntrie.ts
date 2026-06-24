import { ProposalHistoryEntrieIntent } from "@/types/ProposalHistoryEntrieIntent";

export interface ProposalHistoryEntrie {
  user: {
    id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  createdAt: string;
  intent: ProposalHistoryEntrieIntent;
  payload?: string;
}
