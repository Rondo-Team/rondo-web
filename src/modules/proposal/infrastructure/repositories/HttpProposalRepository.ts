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
import { GetAllProposalsByPostIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdRequestDTO";
import { GetAllProposalByPostIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdResponseDTO";
import { GetAllProposalByUserIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdRequestDTO";
import { GetAllProposalByUserIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdResponseDTO";
import { GetProposalByIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalByIdRequestDTO";
import { GetProposalByIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalByIdResponseDTO";
import { getAllProposalsByPostIdMapper } from "@/modules/proposal/infrastructure/mappers/getAllProposalsByPostIdMapper";
import { getAllProposalsByUserIdMapper } from "@/modules/proposal/infrastructure/mappers/getAllProposalsByUserIdMapper";
import { getProposalByIdMapper } from "@/modules/proposal/infrastructure/mappers/getProposalByIdMapper";

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
}
