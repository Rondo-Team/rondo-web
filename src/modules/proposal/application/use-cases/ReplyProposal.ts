import type { ProposalRepository } from "@/modules/proposal/domain/repositories/ProposalRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class ReplyProposal {
  constructor(
    @inject(Token.PROPOSAL_REPOSITORY)
    private readonly proposalRepository: ProposalRepository,
  ) {}

  async run(proposalId: string, message: string) {
    return await this.proposalRepository.reply(
      {
        id: proposalId,
      },
      {
        message,
      },
    );
  }
}
