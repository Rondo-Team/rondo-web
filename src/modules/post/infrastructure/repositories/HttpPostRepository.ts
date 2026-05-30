import { serverHttpClient } from "@/api/http/client/ServerHttpClient";
import { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import { CommentPostRequestDTO } from "@/modules/post/infrastructure/dtos/CommentPostRequestDTO";
import { CommentPostResponseDTO } from "@/modules/post/infrastructure/dtos/CommentPostResponseDTO";
import { CreatePostRequestDTO } from "@/modules/post/infrastructure/dtos/CreatePostRequestDTO";
import { CreatePostResponseDTO } from "@/modules/post/infrastructure/dtos/CreatePostResponseDTO";
import { DeletePostRequestDTO } from "@/modules/post/infrastructure/dtos/DeletePostRequestDTO";
import { DeletePostResponseDTO } from "@/modules/post/infrastructure/dtos/DeletePostResponseDTO";
import { EditPostRequestDTO } from "@/modules/post/infrastructure/dtos/EditPostRequestDTO";
import { EditPostRequestParamsDTO } from "@/modules/post/infrastructure/dtos/EditPostRequestParamsDTO";
import { EditPostResponseDTO } from "@/modules/post/infrastructure/dtos/EditPostResponseDTO";
import { GetCommunityHighlightsRequestDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsRequestDTO";
import { GetCommunityHighlightsResponseDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsResponseDTO";
import { GetLikeByUserAndPostRequestDTO } from "@/modules/post/infrastructure/dtos/GetLikeByUserAndPostRequestDTO";
import { GetLikeByUserAndPostResponseDTO } from "@/modules/post/infrastructure/dtos/GetLikeByUserAndPostResponseDTO";
import { GetPostsByCriteriaRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostByCriteriaRequestDTO";
import { GetPostsByCriteriaResponseDTO } from "@/modules/post/infrastructure/dtos/GetPostByCriteriaResponseDTO";
import { GetPostByIdRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostByIdRequestDTO";
import { GetPostByIdResponseDTO } from "@/modules/post/infrastructure/dtos/GetPostByIdResponseDTO";
import { GetPostCommentsRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostCommentsRequestDTO";
import { GetPostCommentsResponseDTO } from "@/modules/post/infrastructure/dtos/GetPostCommentsResponseDTO";
import { GetPostsByUserIdRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostsByUserIdRequestDTO";
import { GetPostsByUserIdResponseDTO } from "@/modules/post/infrastructure/dtos/GetPostsByUserIdResponseDTO";
import { GetTrendingPostResponseDTO } from "@/modules/post/infrastructure/dtos/GetTrendingPostResponseDTO";
import { GetUserCommentLikesByPostRequestDTO } from "@/modules/post/infrastructure/dtos/GetUserCommentLikesByPostRequestDTO";
import { GetUserCommentLikesByPostResponseDTO } from "@/modules/post/infrastructure/dtos/GetUserCommentLikesByPostResponseDTO";
import { LikeCommentRequestDTO } from "@/modules/post/infrastructure/dtos/LikeCommentRequestDTO";
import { LikeCommentResponseDTO } from "@/modules/post/infrastructure/dtos/LikeCommentResponseDTO";
import { LikePostRequestDTO } from "@/modules/post/infrastructure/dtos/LikePostRequestDTO";
import { LikePostResponseDTO } from "@/modules/post/infrastructure/dtos/LikePostResponseDTO";
import { ReplyPostRequestDTO } from "@/modules/post/infrastructure/dtos/ReplyPostRequestDTO";
import { ReplyPostResponseDTO } from "@/modules/post/infrastructure/dtos/ReplyPostResponseDTO";
import { UnLikeCommentRequestDTO } from "@/modules/post/infrastructure/dtos/UnLikeCommentRequestDTO";
import { UnLikeCommentResponseDTO } from "@/modules/post/infrastructure/dtos/UnLikeCommentResponseDTO";
import { UnLikePostRequestDTO } from "@/modules/post/infrastructure/dtos/UnLikePostRequestDTO";
import { UnLikePostResponseDTO } from "@/modules/post/infrastructure/dtos/UnLikePostResponseDTO";
import { getCommentLikesMapper } from "@/modules/post/infrastructure/mappers/getCommentLikesMapper";
import { getCommunityHighlightsMapper } from "@/modules/post/infrastructure/mappers/getCommunityHighlightsMapper";
import { getFavouriteMapper } from "@/modules/post/infrastructure/mappers/getFavouriteMapper";
import { getPostCommentsMapper } from "@/modules/post/infrastructure/mappers/getPostCommentsMapper";
import { getPostMapper } from "@/modules/post/infrastructure/mappers/getPostMapper";
import { getPostsByCriteriaMapper } from "@/modules/post/infrastructure/mappers/getPostsByCriteriaMapper";
import { getPostsByCriteriaRequestMapper } from "@/modules/post/infrastructure/mappers/getPostsByCriteriaRequestMapper";
import { getPostsByUserIdMapper } from "@/modules/post/infrastructure/mappers/getPostsByUserIdMapper";
import { getTrendingPostMapper } from "@/modules/post/infrastructure/mappers/getTrendingPostMapper";

export class HttpPostRepository implements PostRepository {
  async getTrendingPost() {
    const result = await serverHttpClient.get<GetTrendingPostResponseDTO>(
      "/api/v1/trending-post",
    );
    return getTrendingPostMapper(result);
  }

  // this should be a getPostsByCriteria
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

  async getPostComments(req: GetPostCommentsRequestDTO) {
    const comments = await serverHttpClient.get<GetPostCommentsResponseDTO>(
      `/api/v1/comment/post/${req.id}`,
    );
    return getPostCommentsMapper(comments);
  }

  async commentPost(req: CommentPostRequestDTO) {
    await serverHttpClient.post<CommentPostResponseDTO, CommentPostRequestDTO>(
      "/api/v1/comment",
      req,
    );
  }

  async replyComment(req: ReplyPostRequestDTO) {
    await serverHttpClient.post<ReplyPostResponseDTO, ReplyPostRequestDTO>(
      "/api/v1/comment/reply",
      req,
    );
  }

  async likeComment(req: LikeCommentRequestDTO) {
    await serverHttpClient.post<LikeCommentResponseDTO, LikeCommentRequestDTO>(
      "/api/v1/comment-favourites",
      req,
    );
  }

  async unLikeComment(req: UnLikeCommentRequestDTO) {
    await serverHttpClient.delete<
      UnLikeCommentResponseDTO,
      UnLikeCommentRequestDTO
    >(`/api/v1/comment-favourites/${req.id}`);
  }

  async getUserCommentLikesByPost(req: GetUserCommentLikesByPostRequestDTO) {
    const commentLikes = await serverHttpClient.get<
      GetUserCommentLikesByPostResponseDTO,
      GetUserCommentLikesByPostRequestDTO
    >("/api/v1/comment-favourites", { params: req });
    return getCommentLikesMapper(commentLikes);
  }

  async deletePost(req: DeletePostRequestDTO) {
    await serverHttpClient.delete<DeletePostResponseDTO, DeletePostRequestDTO>(
      `/api/v1/posts/${req.id}`,
    );
  }

  async getPostsByCriteria(req: GetPostsByCriteriaRequestDTO) {
    const parsedReq = getPostsByCriteriaRequestMapper(req);
    const result = await serverHttpClient.get<
      GetPostsByCriteriaResponseDTO,
      GetPostsByCriteriaRequestDTO
    >("/api/v1/posts", { params: parsedReq });

    return getPostsByCriteriaMapper(result);
  }

  async getPostsByUserId(req: GetPostsByUserIdRequestDTO) {
    const result = await serverHttpClient.get<
      GetPostsByUserIdResponseDTO,
      GetPostsByUserIdRequestDTO
    >(`/api/v1/posts/all/${req.userId}`);

    return getPostsByUserIdMapper(result);
  }

  async editPost(req: EditPostRequestParamsDTO, body: EditPostRequestDTO) {
    await serverHttpClient.patch<EditPostResponseDTO, EditPostRequestDTO>(
      `/api/v1/posts/${req.id}`,
      body,
    );
  }
}
