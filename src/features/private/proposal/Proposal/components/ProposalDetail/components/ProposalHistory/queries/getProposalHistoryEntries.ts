import { getProposalHistoryEntriesUseCase } from "@/modules/proposal/ProposalModule";

export const getProposalHistoryEntries = async (proposalId: string) => {
  try {
    return await getProposalHistoryEntriesUseCase.run(proposalId);
  } catch {
    return null;
  }
};
