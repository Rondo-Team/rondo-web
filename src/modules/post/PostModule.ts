import { CreatePost } from "@/modules/post/application/use-cases/CreatePost";
import { GetCommunityHighlights } from "@/modules/post/application/use-cases/GetCommunityHighlights";
import { GetTrendingPost } from "@/modules/post/application/use-cases/GetTrendingPost";
import { HttpPostRepository } from "@/modules/post/infrastructure/repositories/HttpPostRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Container } from "inversify";

const container: Container = new Container();

// Repositories
container.bind(Token.POST_REPOSITORY).to(HttpPostRepository);

// Use cases
container.bind(GetTrendingPost).toSelf();
container.bind(GetCommunityHighlights).toSelf();
container.bind(CreatePost).toSelf();

export const getTrendingPostUseCase = container.get(GetTrendingPost);
export const getCommunityHighlightsUseCase = container.get(
  GetCommunityHighlights,
);
export const createPostUseCase = container.get(CreatePost);
