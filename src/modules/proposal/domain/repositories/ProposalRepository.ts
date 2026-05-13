import { ProposalResume } from "@/modules/proposal/domain/value-objects/ProposalResume";
import { GetAllProposalsByPostIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdRequestDTO";
import { GetAllProposalByUserIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdRequestDTO";

export interface ProposalRepository {
  getAllProposalsByUserId: (
    req: GetAllProposalByUserIdRequestDTO,
  ) => Promise<ProposalResume[]>;
  getAllProposalsByPostId: (
    req: GetAllProposalsByPostIdRequestDTO,
  ) => Promise<ProposalResume[]>;
}
