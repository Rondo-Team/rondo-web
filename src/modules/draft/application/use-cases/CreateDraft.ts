import type { DraftRepository } from "@/modules/draft/domain/repositories/DraftRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Play } from "@/types/Play";
import { inject } from "inversify";

export class CreateDraft {
  constructor(
    @inject(Token.DRAFT_REPOSITORY)
    private readonly draftRepository: DraftRepository,
  ) {}

  async run(id: string, title: string, description: string, play: Play) {
    return await this.draftRepository.create({
      id,
      title,
      description,
      play,
    });
  }
}
