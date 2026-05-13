import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { ProposalRepository } from "@/modules/proposal/domain/repositories/ProposalRepository";
import { GetAllProposalsByPostIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdRequestDTO";
import { GetAllProposalByPostIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByPostIdResponseDTO";
import { GetAllProposalByUserIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdRequestDTO";
import { GetAllProposalByUserIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdResponseDTO";
import { getAllProposalsByPostIdMapper } from "@/modules/proposal/infrastructure/mappers/getAllProposalsByPostIdMapper";
import { getAllProposalsByUserIdMapper } from "@/modules/proposal/infrastructure/mappers/getAllProposalsByUserIdMapper";

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
}
