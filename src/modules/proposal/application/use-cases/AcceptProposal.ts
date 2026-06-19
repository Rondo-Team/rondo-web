import type { ProposalRepository } from "@/modules/proposal/domain/repositories/ProposalRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class AcceptProposal {
  constructor(
    @inject(Token.PROPOSAL_REPOSITORY)
    private readonly proposalRepository: ProposalRepository,
  ) {}

  async run(id: string) {
    return await this.proposalRepository.acceptProposal({
      id,
    });
  }
}
