"use server";
import { getAllProposalsByUserIdUseCase } from "@/modules/proposal/ProposalModule";
import { getUserIdFromCookie } from "@/utils/getUserIdFromCookie";

export const getUserProposals = async () => {
  try {
    const userId = await getUserIdFromCookie();
    if (!userId) throw new Error();
    return await getAllProposalsByUserIdUseCase.run(userId);
  } catch {
    return null;
  }
};
