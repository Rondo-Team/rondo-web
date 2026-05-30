import { CreateDraft } from "@/modules/draft/application/use-cases/CreateDraft";
import { DeleteDraftById } from "@/modules/draft/application/use-cases/DeleteDraftById";
import { GetDraftById } from "@/modules/draft/application/use-cases/GetDraftById";
import { GetDraftsByUser } from "@/modules/draft/application/use-cases/GetDraftsByUser";
import { UpdateDraft } from "@/modules/draft/application/use-cases/UpdateDraft";
import { HttpDraftRepository } from "@/modules/draft/infrastructure/repositories/HttpDraftRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Container } from "inversify";

const container: Container = new Container();

// Repositories
container.bind(Token.DRAFT_REPOSITORY).to(HttpDraftRepository);

// Use cases
container.bind(CreateDraft).toSelf();
container.bind(GetDraftsByUser).toSelf();
container.bind(GetDraftById).toSelf();
container.bind(DeleteDraftById).toSelf();
container.bind(UpdateDraft).toSelf();

export const createDraftUseCase = container.get(CreateDraft);
export const getDraftsByUserUseCase = container.get(GetDraftsByUser);
export const getDraftByIdUseCase = container.get(GetDraftById);
export const deleteDraftByIdUseCase = container.get(DeleteDraftById);
export const updateDraftUseCase = container.get(UpdateDraft);
