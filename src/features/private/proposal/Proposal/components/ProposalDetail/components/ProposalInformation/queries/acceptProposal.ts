"use server";
import { acceptProposalUseCase } from "@/modules/proposal/ProposalModule";

export const acceptProposal = async (id: string) => {
  try {
    return await acceptProposalUseCase.run(id);
  } catch {
    return null;
  }
};
