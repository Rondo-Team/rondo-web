import { AcceptProposal } from "@/modules/proposal/application/use-cases/AcceptProposal";
import { CreateProposal } from "@/modules/proposal/application/use-cases/CreateProposal";
import { DeclineProposal } from "@/modules/proposal/application/use-cases/DeclineProposal";
import { DeleteProposalById } from "@/modules/proposal/application/use-cases/DeleteProposalById";
import { GetAllProposalsByPostId } from "@/modules/proposal/application/use-cases/GetAllProposalsByPostId";
import { GetAllProposalsByUserId } from "@/modules/proposal/application/use-cases/GetAllProposalsByUserId";
import { GetProposalById } from "@/modules/proposal/application/use-cases/GetProposalById";
import { HttpProposalRepository } from "@/modules/proposal/infrastructure/repositories/HttpProposalRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Container } from "inversify";

const container: Container = new Container();

// Repositories
container.bind(Token.PROPOSAL_REPOSITORY).to(HttpProposalRepository);

// Use cases
container.bind(GetAllProposalsByUserId).toSelf();
container.bind(GetAllProposalsByPostId).toSelf();
container.bind(CreateProposal).toSelf();
container.bind(GetProposalById).toSelf();
container.bind(DeleteProposalById).toSelf();
container.bind(AcceptProposal).toSelf();
container.bind(DeclineProposal).toSelf();

export const getAllProposalsByUserIdUseCase = container.get(
  GetAllProposalsByUserId,
);
export const getAllProposalsByPostIdUseCase = container.get(
  GetAllProposalsByPostId,
);
export const createProposalUseCase = container.get(CreateProposal);
export const getProposalByIdUseCase = container.get(GetProposalById);
export const deleteProposalByIdUseCase = container.get(DeleteProposalById);
export const acceptProposalUseCase = container.get(AcceptProposal);
export const declineProposalUseCase = container.get(DeclineProposal);
