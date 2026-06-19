import { ProposalDetail } from "@/modules/proposal/domain/value-objects/ProposalDetail";
import { GetProposalByIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalByIdResponseDTO";
import { ProposalStatus } from "@/types/ProposalStatus";

export const getProposalByIdMapper = (
  dto: GetProposalByIdResponseDTO,
): ProposalDetail => {
  return {
    id: dto.id,
    title: dto.title,
    createdAt: dto.createdAt,
    status: dto.status as ProposalStatus,
    description: dto.description,
    play: dto.play,
    post: dto.post,
    user: dto.user,
  };
};
