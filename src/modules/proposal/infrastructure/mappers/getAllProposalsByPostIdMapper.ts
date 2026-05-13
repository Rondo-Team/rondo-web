import { ProposalResume } from "@/modules/proposal/domain/value-objects/ProposalResume";
import { GetAllProposalByPostIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdResponseDTO";

export const getAllProposalsByPostIdMapper = (
  dto: GetAllProposalByPostIdResponseDTO,
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
