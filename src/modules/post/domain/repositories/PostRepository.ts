import { CommunityHighlight } from "@/modules/post/domain/value-object/CommunityHighlight";
import { TrendingPost } from "@/modules/post/domain/value-object/TrendingPost";
import { GetCommunityHighlightsRequestDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsRequestDTO";
import { PaginatedResponse } from "@/modules/shared/pagination/domain/PaginatedResponse";

export interface PostRepository {
  getTrendingPost: () => Promise<TrendingPost>;
  getCommunityHighlights: (
    req: GetCommunityHighlightsRequestDTO,
  ) => Promise<PaginatedResponse<CommunityHighlight>>;
}
