import type { ProposalRepository } from "@/modules/proposal/domain/repositories/ProposalRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Play } from "@/types/Play";
import { inject } from "inversify";

export class CreateProposal {
  constructor(
    @inject(Token.PROPOSAL_REPOSITORY)
    private readonly proposalRepository: ProposalRepository,
  ) {}

  async run(
    id: string,
    postId: string,
    title: string,
    description: string,
    play: Play,
  ) {
    return await this.proposalRepository.create({
      id,
      postId,
      title,
      description,
      play,
    });
  }
}
