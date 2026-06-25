import { RefreshSession } from "@/modules/auth/application/RefreshSession";
import { SignOut } from "@/modules/auth/application/SignOut";
import { HttpAuthRepository } from "@/modules/auth/infrastructure/repositories/HttpAuthRepository";
import { Token } from "@/modules/shared/domain/Token";
import { NextCookieService } from "@/modules/shared/infrastructure/services/NextCookieService";
import { Container } from "inversify";

const container: Container = new Container();

// Repositories
container.bind(Token.AUTH_REPOSITORY).to(HttpAuthRepository);
container.bind(Token.COOKIES_SERVICE).to(NextCookieService);

// Use cases
container.bind(RefreshSession).toSelf();
container.bind(SignOut).toSelf();

export const refreshSessionUseCase = container.get(RefreshSession);
export const signOutUseCase = container.get(SignOut);
