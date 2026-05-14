import { CommentFavourite } from "@/modules/post/domain/value-object/CommentFavourite";
import { CommunityHighlight } from "@/modules/post/domain/value-object/CommunityHighlight";
import { PostComment } from "@/modules/post/domain/value-object/PostComment";
import { PostDetail } from "@/modules/post/domain/value-object/PostDetail";
import { PostFavourite } from "@/modules/post/domain/value-object/PostFavourite";
import { PostResume } from "@/modules/post/domain/value-object/PostResume";
import { TrendingPost } from "@/modules/post/domain/value-object/TrendingPost";
import { CommentPostRequestDTO } from "@/modules/post/infrastructure/dtos/CommentPostRequestDTO";
import { CreatePostRequestDTO } from "@/modules/post/infrastructure/dtos/CreatePostRequestDTO";
import { DeletePostRequestDTO } from "@/modules/post/infrastructure/dtos/DeletePostRequestDTO";
import { GetCommunityHighlightsRequestDTO } from "@/modules/post/infrastructure/dtos/GetCommunityHighlightsRequestDTO";
import { GetLikeByUserAndPostRequestDTO } from "@/modules/post/infrastructure/dtos/GetLikeByUserAndPostRequestDTO";
import { GetPostsByCriteriaRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostByCriteriaRequestDTO";
import { GetPostByIdRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostByIdRequestDTO";
import { GetPostCommentsRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostCommentsRequestDTO";
import { GetUserCommentLikesByPostRequestDTO } from "@/modules/post/infrastructure/dtos/GetUserCommentLikesByPostRequestDTO";
import { LikeCommentRequestDTO } from "@/modules/post/infrastructure/dtos/LikeCommentRequestDTO";
import { LikePostRequestDTO } from "@/modules/post/infrastructure/dtos/LikePostRequestDTO";
import { ReplyPostRequestDTO } from "@/modules/post/infrastructure/dtos/ReplyPostRequestDTO";
import { UnLikeCommentRequestDTO } from "@/modules/post/infrastructure/dtos/UnLikeCommentRequestDTO";
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
  getPostComments: (req: GetPostCommentsRequestDTO) => Promise<PostComment[]>;
  commentPost: (req: CommentPostRequestDTO) => Promise<void>;
  replyComment: (req: ReplyPostRequestDTO) => Promise<void>;
  likeComment: (req: LikeCommentRequestDTO) => Promise<void>;
  unLikeComment: (req: UnLikeCommentRequestDTO) => Promise<void>;
  getUserCommentLikesByPost: (
    req: GetUserCommentLikesByPostRequestDTO,
  ) => Promise<CommentFavourite[]>;
  getLikeByUserAndPost: (
    req: GetLikeByUserAndPostRequestDTO,
  ) => Promise<PostFavourite>;
  deletePost: (req: DeletePostRequestDTO) => Promise<void>;
  getPostsByCriteria: (
    req: GetPostsByCriteriaRequestDTO,
  ) => Promise<PaginatedResponse<PostResume>>;
}
