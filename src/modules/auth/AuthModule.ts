import { RefreshSession } from "@/modules/auth/application/RefreshSession";
import { HttpAuthRepository } from "@/modules/auth/infrastructure/repositories/HttpAuthRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Container } from "inversify";

const container: Container = new Container();

// Repositories
container.bind(Token.AUTH_REPOSITORY).to(HttpAuthRepository);

// Use cases
container.bind(RefreshSession).toSelf();

export const refreshSessionUseCase = container.get(RefreshSession);
