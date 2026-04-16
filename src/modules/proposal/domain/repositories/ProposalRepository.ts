import { ProposalResume } from "@/modules/proposal/domain/value-objects/ProposalResume";
import { GetAllProposalByUserIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdRequestDTO";

export interface ProposalRepository {
  getAllProposalsByUserId: (
    req: GetAllProposalByUserIdRequestDTO,
  ) => Promise<ProposalResume[]>;
}
