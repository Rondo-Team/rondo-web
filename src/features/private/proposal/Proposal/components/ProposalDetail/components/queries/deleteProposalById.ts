"use server";
import { deleteProposalByIdUseCase } from "@/modules/proposal/ProposalModule";

export const deleteProposalById = async (id: string) => {
  try {
    return await deleteProposalByIdUseCase.run(id);
  } catch {
    return null;
  }
};
