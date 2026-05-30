import { DraftResume } from "@/modules/draft/domain/value-objects/DraftResume";
import { GetDraftsByUserResponseDTO } from "@/modules/draft/infrastructure/dtos/GetDraftsByUserResponseDTO";

export const getDraftsByUserMapper = (
  dto: GetDraftsByUserResponseDTO,
): DraftResume[] => {
  return dto.map((draft) => ({
    title: draft.title,
    description: draft.description,
    id: draft.id,
  }));
};
