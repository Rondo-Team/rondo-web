import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import { CreatePostRequestDTO } from "@/modules/post/infrastructure/dtos/CreatePostRequestDTO";
import { CreatePostResponseDTO } from "@/modules/post/infrastructure/dtos/CreatePostResponseDTO";
import { GetCommunityHighlightsRequestDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsRequestDTO";
import { GetCommunityHighlightsResponseDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsResponseDTO";
import { GetTrendingPostResponseDTO } from "@/modules/post/infrastructure/dtos/GetTrendingPostResponseDTO";
import { getCommunityHighlightsMapper } from "@/modules/post/infrastructure/mappers/getCommunityHighlightsMapper";
import { getTrendingPostMapper } from "@/modules/post/infrastructure/mappers/getTrendingPostMapper";

export class HttpPostRepository implements PostRepository {
  async getTrendingPost() {
    const result = await serverHttpClient.get<GetTrendingPostResponseDTO>(
      "/api/v1/trending-post",
    );
    return getTrendingPostMapper(result);
  }
  async getCommunityHighlights(req: GetCommunityHighlightsRequestDTO) {
    const result =
      await serverHttpClient.get<GetCommunityHighlightsResponseDTO>(
        "/api/v1/posts",
        { params: req },
      );
    return getCommunityHighlightsMapper(result);
  }

  async create(body: CreatePostRequestDTO) {
    console.dir(body, { depth: null });
    await serverHttpClient.post<CreatePostResponseDTO, CreatePostRequestDTO>(
      "/api/v1/posts",
      body,
    );
  }
}
