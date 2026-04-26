import { CommunityHighlight } from "@/modules/post/domain/value-object/CommunityHighlight";
import { PostDetail } from "@/modules/post/domain/value-object/PostDetail";
import { PostFavourite } from "@/modules/post/domain/value-object/PostFavourite";
import { TrendingPost } from "@/modules/post/domain/value-object/TrendingPost";
import { CreatePostRequestDTO } from "@/modules/post/infrastructure/dtos/CreatePostRequestDTO";
import { GetCommunityHighlightsRequestDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsRequestDTO";
import { GetLikeByUserAndPostRequestDTO } from "@/modules/post/infrastructure/dtos/GetLikeByUserAndPostRequestDTO";
import { GetPostByIdRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostByIdRequestDTO";
import { LikePostRequestDTO } from "@/modules/post/infrastructure/dtos/LikePostRequestDTO";
import { UnLikePostRequestDTO } from "@/modules/post/infrastructure/dtos/UnLikePostRequestDTO";
import { PaginatedResponse } from "@/modules/shared/pagination/domain/PaginatedResponse";

export interface PostRepository {
  getTrendingPost: () => Promise<TrendingPost>;
  getCommunityHighlights: (
    req: GetCommunityHighlightsRequestDTO,
  ) => Promise<PaginatedResponse<CommunityHighlight>>;
  create: (body: CreatePostRequestDTO) => Promise<void>;
  getPostById: (req: GetPostByIdRequestDTO) => Promise<PostDetail>;
  likePost: (body: LikePostRequestDTO) => Promise<void>;
  unLikePost: (body: UnLikePostRequestDTO) => Promise<void>;

  getLikeByUserAndPost: (
    req: GetLikeByUserAndPostRequestDTO,
  ) => Promise<PostFavourite>;
}
