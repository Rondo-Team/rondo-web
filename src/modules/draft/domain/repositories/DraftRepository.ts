import { DraftDetail } from "@/modules/draft/domain/value-objects/DraftDetail";
import { DraftResume } from "@/modules/draft/domain/value-objects/DraftResume";
import { CreateDraftRequestDTO } from "@/modules/draft/infrastructure/dtos/CreateDraftRequestDTO";
import { DeleteDraftByIdRequestDTO } from "@/modules/draft/infrastructure/dtos/DeleteDraftByIdRequestDTO";
import { GetDraftByIdRequestDTO } from "@/modules/draft/infrastructure/dtos/GetDraftByIdRequestDTO";

export interface DraftRepository {
  create: (body: CreateDraftRequestDTO) => Promise<void>;
  getDraftsByUser: () => Promise<DraftResume[]>;
  getDraftById: (req: GetDraftByIdRequestDTO) => Promise<DraftDetail>;
  deleteDraftById: (req: DeleteDraftByIdRequestDTO) => Promise<void>;
}
