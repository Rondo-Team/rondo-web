import { GetTrendingPost } from "@/modules/post/application/use-cases/GetTrendingPost";
import { HttpPostRepository } from "@/modules/post/infrastructure/repositories/HttpPostRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Container } from "inversify";

const container: Container = new Container();

// Repositories
container.bind(Token.POST_REPOSITORY).to(HttpPostRepository);

// Use cases
container.bind(GetTrendingPost).toSelf();

export const getTrendingPostUseCase = container.get(GetTrendingPost);
