import type { DraftRepository } from "@/modules/draft/domain/repositories/DraftRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class GetDraftById {
  constructor(
    @inject(Token.DRAFT_REPOSITORY)
    private readonly draftRepository: DraftRepository,
  ) {}

  async run(id: string) {
    return await this.draftRepository.getDraftById({ id });
  }
}
