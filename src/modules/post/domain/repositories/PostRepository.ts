import { CommunityHighlight } from "@/modules/post/domain/value-object/CommunityHighlight";
import { PostDetail } from "@/modules/post/domain/value-object/PostDetail";
import { TrendingPost } from "@/modules/post/domain/value-object/TrendingPost";
import { CreatePostRequestDTO } from "@/modules/post/infrastructure/dtos/CreatePostRequestDTO";
import { GetCommunityHighlightsRequestDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsRequestDTO";
import { GetPostByIdRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostByIdRequestDTO";
import { PaginatedResponse } from "@/modules/shared/pagination/domain/PaginatedResponse";

export interface PostRepository {
  getTrendingPost: () => Promise<TrendingPost>;
  getCommunityHighlights: (
    req: GetCommunityHighlightsRequestDTO,
  ) => Promise<PaginatedResponse<CommunityHighlight>>;
  create: (body: CreatePostRequestDTO) => Promise<void>;
  getPostById: (req: GetPostByIdRequestDTO) => Promise<PostDetail>;
}
