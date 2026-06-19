import { ProposalDetail } from "@/modules/proposal/domain/value-objects/ProposalDetail";
import { ProposalResume } from "@/modules/proposal/domain/value-objects/ProposalResume";
import { AcceptProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/AcceptProposalRequestDTO";
import { CreateProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/CreateProposalRequestDTO";
import { DeclineProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/DeclineProposalRequestDTO";
import { DeleteProposalByIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/DeleteProposalByIdRequestDTO";
import { GetAllProposalsByPostIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdRequestDTO";
import { GetAllProposalByUserIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdRequestDTO";
import { GetProposalByIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalByIdRequestDTO";

export interface ProposalRepository {
  getAllProposalsByUserId: (
    req: GetAllProposalByUserIdRequestDTO,
  ) => Promise<ProposalResume[]>;
  getAllProposalsByPostId: (
    req: GetAllProposalsByPostIdRequestDTO,
  ) => Promise<ProposalResume[]>;
  create: (body: CreateProposalRequestDTO) => Promise<void>;
  getById: (req: GetProposalByIdRequestDTO) => Promise<ProposalDetail>;
  deleteById: (req: DeleteProposalByIdRequestDTO) => Promise<void>;
  acceptProposal: (req: AcceptProposalRequestDTO) => Promise<void>;
  declineProposal: (req: DeclineProposalRequestDTO) => Promise<void>;
}
