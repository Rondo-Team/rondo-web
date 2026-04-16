import { getAllProposalsByUserIdUseCase } from "@/modules/proposal/ProposalModule";

export const getAllProposalsByUserId = async (userId: string) => {
  try {
    return await getAllProposalsByUserIdUseCase.run(userId);
  } catch {
    return null;
  }
};
