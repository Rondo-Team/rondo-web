"use server";
import { declineProposalUseCase } from "@/modules/proposal/ProposalModule";

export const declineProposal = async (id: string) => {
  try {
    return await declineProposalUseCase.run(id);
  } catch {
    return null;
  }
};
