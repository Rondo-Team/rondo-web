import { ProposalResume } from "@/modules/proposal/domain/value-objects/ProposalResume";
import { GetAllProposalByUserIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdResponseDTO";

export const getAllProposalsByUserIdMapper = (
  dto: GetAllProposalByUserIdResponseDTO,
): ProposalResume[] => {
  return dto.map((proposal) => ({
    id: proposal.id,
    title: proposal.title,
    postTitle: proposal.post.title,
    username: proposal.user.username,
    createdAt: proposal.createdAt,
    status: proposal.status,
  }));
};
