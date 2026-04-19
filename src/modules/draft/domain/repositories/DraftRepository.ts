import { CreateDraftRequestDTO } from "@/modules/draft/infrastructure/dtos/CreateDraftRequestDTO";

export interface DraftRepository {
  create: (body: CreateDraftRequestDTO) => Promise<void>;
}
