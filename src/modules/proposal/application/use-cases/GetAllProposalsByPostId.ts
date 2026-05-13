import type { ProposalRepository } from "@/modules/proposal/domain/repositories/ProposalRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class GetAllProposalsByPostId {
  constructor(
    @inject(Token.PROPOSAL_REPOSITORY)
    private readonly proposalRepository: ProposalRepository,
  ) {}

  async run(postId: string) {
    return await this.proposalRepository.getAllProposalsByPostId({
      postId,
    });
  }
}
