import { getProposalByIdUseCase } from "@/modules/proposal/ProposalModule";

export const getProposalById = async (id: string) => {
  try {
    return await getProposalByIdUseCase.run(id);
  } catch {
    return null;
  }
};
