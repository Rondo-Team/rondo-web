import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { DraftRepository } from "@/modules/draft/domain/repositories/DraftRepository";
import { CreateDraftRequestDTO } from "@/modules/draft/infrastructure/dtos/CreateDraftRequestDTO";
import { CreateDraftResponseDTO } from "@/modules/draft/infrastructure/dtos/CreateDraftResponseDTO";
import { GetDraftsByUserResponseDTO } from "@/modules/draft/infrastructure/dtos/GetDraftsByUserResponseDTO";
import { getDraftsByUserMapper } from "@/modules/draft/infrastructure/mapper/getDraftsByUserMapper";

export class HttpDraftRepository implements DraftRepository {
  async create(body: CreateDraftRequestDTO) {
    console.dir(body, { depth: null });
    await serverHttpClient.post<CreateDraftResponseDTO, CreateDraftRequestDTO>(
      "/api/v1/drafts",
      body,
    );
  }

  async getDraftsByUser() {
    const result =
      await serverHttpClient.get<GetDraftsByUserResponseDTO>("/api/v1/drafts");
    return getDraftsByUserMapper(result);
  }
}
