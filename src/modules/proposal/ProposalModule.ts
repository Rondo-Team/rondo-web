import { GetAllProposalsByPostId } from "@/modules/proposal/application/use-cases/GetAllProposalsByPostId";
import { GetAllProposalsByUserId } from "@/modules/proposal/application/use-cases/GetAllProposalsByUserId";
import { HttpProposalRepository } from "@/modules/proposal/infrastructure/repositories/HttpProposalRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Container } from "inversify";

const container: Container = new Container();

// Repositories
container.bind(Token.PROPOSAL_REPOSITORY).to(HttpProposalRepository);

// Use cases
container.bind(GetAllProposalsByUserId).toSelf();
container.bind(GetAllProposalsByPostId).toSelf();

export const getAllProposalsByUserIdUseCase = container.get(
  GetAllProposalsByUserId,
);

export const getAllProposalsByPostIdUseCase = container.get(
  GetAllProposalsByPostId,
);
