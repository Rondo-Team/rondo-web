import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import { CreatePostRequestDTO } from "@/modules/post/infrastructure/dtos/CreatePostRequestDTO";
import { CreatePostResponseDTO } from "@/modules/post/infrastructure/dtos/CreatePostResponseDTO";
import { GetCommunityHighlightsRequestDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsRequestDTO";
import { GetCommunityHighlightsResponseDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsResponseDTO";
import { GetLikeByUserAndPostRequestDTO } from "@/modules/post/infrastructure/dtos/GetLikeByUserAndPostRequestDTO";
import { GetLikeByUserAndPostResponseDTO } from "@/modules/post/infrastructure/dtos/GetLikeByUserAndPostResponseDTO";
import { GetPostByIdRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostByIdRequestDTO";
import { GetPostByIdResponseDTO } from "@/modules/post/infrastructure/dtos/GetPostByIdResponseDTO";
import { GetTrendingPostResponseDTO } from "@/modules/post/infrastructure/dtos/GetTrendingPostResponseDTO";
import { LikePostRequestDTO } from "@/modules/post/infrastructure/dtos/LikePostRequestDTO";
import { LikePostResponseDTO } from "@/modules/post/infrastructure/dtos/LikePostResponseDTO";
import { UnLikePostRequestDTO } from "@/modules/post/infrastructure/dtos/UnLikePostRequestDTO";
import { UnLikePostResponseDTO } from "@/modules/post/infrastructure/dtos/UnLikePostResponseDTO";
import { getCommunityHighlightsMapper } from "@/modules/post/infrastructure/mappers/getCommunityHighlightsMapper";
import { getFavouriteMapper } from "@/modules/post/infrastructure/mappers/getFavouriteMapper";
import { getPostMapper } from "@/modules/post/infrastructure/mappers/getPostMapper";
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
    await serverHttpClient.post<CreatePostResponseDTO, CreatePostRequestDTO>(
      "/api/v1/posts",
      body,
    );
  }

  async getPostById(req: GetPostByIdRequestDTO) {
    const result = await serverHttpClient.get<GetPostByIdResponseDTO>(
      `/api/v1/posts/${req.id}`,
    );
    return getPostMapper(result);
  }

  async likePost(body: LikePostRequestDTO) {
    await serverHttpClient.post<LikePostResponseDTO, LikePostRequestDTO>(
      "/api/v1/post-favourites",
      body,
    );
  }

  async getLikeByUserAndPost(req: GetLikeByUserAndPostRequestDTO) {
    const result = await serverHttpClient.get<GetLikeByUserAndPostResponseDTO>(
      `/api/v1/post-favourites/me/post/${req.postId}`,
    );
    return getFavouriteMapper(result);
  }

  async unLikePost(req: UnLikePostRequestDTO) {
    await serverHttpClient.delete<UnLikePostResponseDTO, UnLikePostRequestDTO>(
      `/api/v1/post-favourites/${req.id}`,
    );
  }
}
