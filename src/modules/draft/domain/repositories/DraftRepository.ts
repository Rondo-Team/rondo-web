import { DraftResume } from "@/modules/draft/domain/value-objects/DraftResume";
import { CreateDraftRequestDTO } from "@/modules/draft/infrastructure/dtos/CreateDraftRequestDTO";

export interface DraftRepository {
  create: (body: CreateDraftRequestDTO) => Promise<void>;
  getDraftsByUser: () => Promise<DraftResume[]>;
}
