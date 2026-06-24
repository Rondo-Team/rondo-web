import { ProposalHistoryEntrieIntent } from "@/types/ProposalHistoryEntrieIntent";

export type ProposalHistoryEntrie = {
  userId: string;
  createdAt: string;
  intent: ProposalHistoryEntrieIntent;
  payload?: string;
};
