import { DraftDetail } from "@/modules/draft/domain/value-objects/DraftDetail";
import { GetDraftByIdResponseDTO } from "@/modules/draft/infrastructure/dtos/GetDraftByIdResponseDTO";

export const getDraftByIdMapper = (
  dto: GetDraftByIdResponseDTO,
): DraftDetail => {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    createdAt: dto.createdAt,
    play: dto.play,
    userId: dto.userId,
  };
};
