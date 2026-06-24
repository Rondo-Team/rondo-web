"use server"
import { replyProposalUseCase } from "@/modules/proposal/ProposalModule";

export const replyProposal = async (proposalId: string, message: string) => {
  try {
    await replyProposalUseCase.run(proposalId, message);
  } catch {
    return null;
  }
};
