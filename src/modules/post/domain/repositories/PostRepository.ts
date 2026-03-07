import { TrendingPost } from "@/modules/post/domain/value-object/TrendingPost";

export interface PostRepository {
  getTrendingPost: () => Promise<TrendingPost>;
}
