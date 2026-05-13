"use server";

import { getAllProposalsByPostIdUseCase } from "@/modules/proposal/ProposalModule";

export const getAllProposalsByPostId = async (postId: string) => {
  try {
    return await getAllProposalsByPostIdUseCase.run(postId);
  } catch {
    return null;
  }
};
