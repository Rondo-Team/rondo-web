import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { DraftRepository } from "@/modules/draft/domain/repositories/DraftRepository";
import { CreateDraftRequestDTO } from "@/modules/draft/infrastructure/dtos/CreateDraftRequestDTO";
import { CreateDraftResponseDTO } from "@/modules/draft/infrastructure/dtos/CreateDraftResponseDTO";
import { DeleteDraftByIdRequestDTO } from "@/modules/draft/infrastructure/dtos/DeleteDraftByIdRequestDTO";
import { DeleteDraftByIdResponseDTO } from "@/modules/draft/infrastructure/dtos/DeleteDraftByIdResponseDTO";
import { EditDraftRequestDTO } from "@/modules/draft/infrastructure/dtos/EditDraftRequestDTO";
import { EditDraftRequestParamsDTO } from "@/modules/draft/infrastructure/dtos/EditDraftRequestParamsDTO";
import { GetDraftByIdRequestDTO } from "@/modules/draft/infrastructure/dtos/GetDraftByIdRequestDTO";
import { GetDraftByIdResponseDTO } from "@/modules/draft/infrastructure/dtos/GetDraftByIdResponseDTO";
import { GetDraftsByUserResponseDTO } from "@/modules/draft/infrastructure/dtos/GetDraftsByUserResponseDTO";
import { getDraftByIdMapper } from "@/modules/draft/infrastructure/mappers/getDraftByIdMapper";
import { getDraftsByUserMapper } from "@/modules/draft/infrastructure/mappers/getDraftsByUserMapper";

export class HttpDraftRepository implements DraftRepository {
  async create(body: CreateDraftRequestDTO) {
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

  async getDraftById(req: GetDraftByIdRequestDTO) {
    const result = await serverHttpClient.get<GetDraftByIdResponseDTO>(
      `/api/v1/drafts/${req.id}`,
    );
    return getDraftByIdMapper(result);
  }

  async deleteDraftById(req: DeleteDraftByIdRequestDTO) {
    await serverHttpClient.delete<DeleteDraftByIdResponseDTO>(
      `/api/v1/drafts/${req.id}`,
    );
  }

  async editDraft(
    params: EditDraftRequestParamsDTO,
    body: EditDraftRequestDTO,
  ) {
    await serverHttpClient.patch(`/api/v1/drafts/${params.id}`, body);
  }
}
