import { ProposalDetail } from "@/modules/proposal/domain/value-objects/ProposalDetail";
import { ProposalHistoryEntrie } from "@/modules/proposal/domain/value-objects/ProposalHistoryEntrie";
import { ProposalResume } from "@/modules/proposal/domain/value-objects/ProposalResume";
import { AcceptProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/AcceptProposalRequestDTO";
import { CreateProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/CreateProposalRequestDTO";
import { DeclineProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/DeclineProposalRequestDTO";
import { DeleteProposalByIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/DeleteProposalByIdRequestDTO";
import { EditProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/EditProposalRequestDTO";
import { EditProposalRequestParamsDTO } from "@/modules/proposal/infrastructure/dtos/EditProposalRequestParamsDTO";
import { GetAllProposalsByPostIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdRequestDTO";
import { GetAllProposalByUserIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdRequestDTO";
import { GetProposalByIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalByIdRequestDTO";
import { GetProposalHistoryEntriesRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalHistoryEntriesRequesDTO";
import { ReplyProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/ReplyProposalRequestDTO";
import { ReplyProposalRequestParamsDTO } from "@/modules/proposal/infrastructure/dtos/ReplyProposalRequestParamsDTO";

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
  getProposalHistoryEntries: (
    req: GetProposalHistoryEntriesRequestDTO,
  ) => Promise<ProposalHistoryEntrie[]>;
  reply: (
    req: ReplyProposalRequestParamsDTO,
    body: ReplyProposalRequestDTO,
  ) => Promise<void>;
  edit: (
    req: EditProposalRequestParamsDTO,
    body: EditProposalRequestDTO,
  ) => Promise<void>;
}
