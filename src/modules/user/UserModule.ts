import { Token } from "@/modules/shared/domain/Token";
import { NextCookieService } from "@/modules/shared/infrastructure/services/NextCookieService";
import { LoginUser } from "@/modules/user/application/use-cases/LoginUser";
import { RegisterUser } from "@/modules/user/application/use-cases/RegisterUser";
import { HttpUserRepository } from "@/modules/user/infrastructure/repositories/HttpUserRepository";
import { Container } from "inversify";

const container: Container = new Container();

// Repositories
container.bind(Token.USER_REPOSITORY).to(HttpUserRepository);
container.bind(Token.COOKIES_SERVICE).to(NextCookieService);

// Use cases
container.bind(LoginUser).toSelf();
container.bind(RegisterUser).toSelf();

export const loginUserUseCase = container.get(LoginUser);
export const registerUserUseCase = container.get(RegisterUser);
