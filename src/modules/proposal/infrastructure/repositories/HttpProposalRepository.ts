import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { ProposalRepository } from "@/modules/proposal/domain/repositories/ProposalRepository";
import { GetAllProposalByUserIdRequestDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdRequestDTO";
import { GetAllProposalByUserIdResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetAllProposalsByUserIdResponseDTO";
import { getAllProposalsByUserIdMapper } from "@/modules/proposal/infrastructure/mappers/getAllProposalsByUserIdMapper";

export class HttpProposalRepository implements ProposalRepository {
  async getAllProposalsByUserId(req: GetAllProposalByUserIdRequestDTO) {
    const result =
      await serverHttpClient.get<GetAllProposalByUserIdResponseDTO>(
        `/api/v1/proposal/user/${req.userId}`,
      );
    return getAllProposalsByUserIdMapper(result);
  }
}
