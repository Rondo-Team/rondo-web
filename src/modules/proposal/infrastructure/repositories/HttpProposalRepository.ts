import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { ProposalRepository } from "@/modules/proposal/domain/repositories/ProposalRepository";
import { AcceptProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/AcceptProposalRequestDTO";
import { AcceptProposalResponseDTO } from "@/modules/proposal/infrastructure/dtos/AcceptProposalResponseDTO";
import { CreateProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/CreateProposalRequestDTO";
import { CreateProposalResponseDTO } from "@/modules/proposal/infrastructure/dtos/CreateProposalResponseDTO";
import { DeclineProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/DeclineProposalRequestDTO";
import { DeclineProposalResponseDTO } from "@/modules/proposal/infrastructure/dtos/DeclineProposalResponseDTO";
import { DeleteProposalByIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/DeleteProposalByIdRequestDTO";
import { DeleteProposalByIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/DeleteProposalByIdResponseDTO";
import { EditProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/EditProposalRequestDTO";
import { EditProposalRequestParamsDTO } from "@/modules/proposal/infrastructure/dtos/EditProposalRequestParamsDTO";
import { EditProposalResponseDTO } from "@/modules/proposal/infrastructure/dtos/EditProposalResponseDTO";
import { GetAllProposalsByPostIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdRequestDTO";
import { GetAllProposalByPostIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdResponseDTO";
import { GetAllProposalByUserIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdRequestDTO";
import { GetAllProposalByUserIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdResponseDTO";
import { GetProposalByIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalByIdRequestDTO";
import { GetProposalByIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalByIdResponseDTO";
import { GetProposalHistoryEntriesRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalHistoryEntriesRequesDTO";
import { GetProposalHistoryEntriesResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalHistoryEntriesResponseDTO";
import { ReplyProposalRequestDTO } from "@/modules/proposal/infrastructure/dtos/ReplyProposalRequestDTO";
import { ReplyProposalRequestParamsDTO } from "@/modules/proposal/infrastructure/dtos/ReplyProposalRequestParamsDTO";
import { ReplyProposalResponseDTO } from "@/modules/proposal/infrastructure/dtos/ReplyProposalResponseDTO";
import { getAllProposalsByPostIdMapper } from "@/modules/proposal/infrastructure/mappers/getAllProposalsByPostIdMapper";
import { getAllProposalsByUserIdMapper } from "@/modules/proposal/infrastructure/mappers/getAllProposalsByUserIdMapper";
import { getProposalByIdMapper } from "@/modules/proposal/infrastructure/mappers/getProposalByIdMapper";
import { getProposalHistoryEntriesMapper } from "@/modules/proposal/infrastructure/mappers/getProposalHistoryEntriesMapper";

export class HttpProposalRepository implements ProposalRepository {
  async getAllProposalsByUserId(req: GetAllProposalByUserIdRequestDTO) {
    const result =
      await serverHttpClient.get<GetAllProposalByUserIdResponseDTO>(
        `/api/v1/proposal/user/${req.userId}`,
      );
    return getAllProposalsByUserIdMapper(result);
  }

  async getAllProposalsByPostId(req: GetAllProposalsByPostIdRequestDTO) {
    const result =
      await serverHttpClient.get<GetAllProposalByPostIdResponseDTO>(
        `/api/v1/proposal/post/${req.postId}`,
      );
    return getAllProposalsByPostIdMapper(result);
  }

  async create(body: CreateProposalRequestDTO) {
    await serverHttpClient.post<
      CreateProposalResponseDTO,
      CreateProposalRequestDTO
    >(`/api/v1/proposal`, body);
  }
  async getById(req: GetProposalByIdRequestDTO) {
    const result = await serverHttpClient.get<
      GetProposalByIdResponseDTO,
      GetProposalByIdRequestDTO
    >(`/api/v1/proposal/${req.id}`);

    return getProposalByIdMapper(result);
  }

  async deleteById(req: DeleteProposalByIdRequestDTO) {
    await serverHttpClient.delete<
      DeleteProposalByIdResponseDTO,
      DeleteProposalByIdRequestDTO
    >(`/api/v1/proposal/${req.id}`);
  }

  async acceptProposal(req: AcceptProposalRequestDTO) {
    await serverHttpClient.post<
      AcceptProposalResponseDTO,
      AcceptProposalRequestDTO
    >(`/api/v1/proposal/${req.id}/accept`);
  }

  async declineProposal(req: DeclineProposalRequestDTO) {
    await serverHttpClient.post<
      DeclineProposalResponseDTO,
      DeclineProposalRequestDTO
    >(`/api/v1/proposal/${req.id}/decline`);
  }

  async getProposalHistoryEntries(req: GetProposalHistoryEntriesRequestDTO) {
    const historyEntries = await serverHttpClient.get<
      GetProposalHistoryEntriesResponseDTO,
      GetProposalHistoryEntriesRequestDTO
    >(`/api/v1/proposal/${req.id}/history`);
    return getProposalHistoryEntriesMapper(historyEntries);
  }

  async reply(
    req: ReplyProposalRequestParamsDTO,
    body: ReplyProposalRequestDTO,
  ) {
    await serverHttpClient.post<
      ReplyProposalResponseDTO,
      ReplyProposalRequestDTO
    >(`/api/v1/proposal/${req.id}/reply`, body);
  }

  async edit(req: EditProposalRequestParamsDTO, body: EditProposalRequestDTO) {
    await serverHttpClient.patch<
      EditProposalResponseDTO,
      EditProposalRequestDTO
    >(`/api/v1/proposal/${req.id}`, body);
  }
}
