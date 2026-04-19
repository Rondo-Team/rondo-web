import { CreateDraft } from "@/modules/draft/application/use-cases/CreateDraft";
import { HttpDraftRepository } from "@/modules/draft/infrastructure/repositories/HttpDraftRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Container } from "inversify";

const container: Container = new Container();

// Repositories
container.bind(Token.DRAFT_REPOSITORY).to(HttpDraftRepository);

// Use cases
container.bind(CreateDraft).toSelf();

export const createDraftUseCase = container.get(CreateDraft);
