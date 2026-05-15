import { CommentPost } from "@/modules/post/application/use-cases/CommentPost";
import { CreatePost } from "@/modules/post/application/use-cases/CreatePost";
import { DeletePost } from "@/modules/post/application/use-cases/DeletePost";
import { GetCommunityHighlights } from "@/modules/post/application/use-cases/GetCommunityHighlights";
import { GetLikeByUserAndPost } from "@/modules/post/application/use-cases/GetLikeByUserAndPost";
import { GetPostById } from "@/modules/post/application/use-cases/GetPostById";
import { GetPostComments } from "@/modules/post/application/use-cases/GetPostComments";
import { GetPostsByCriteria } from "@/modules/post/application/use-cases/GetPostsByCriteria";
import { GetTrendingPost } from "@/modules/post/application/use-cases/GetTrendingPost";
import { GetUserCommentLikesByPost } from "@/modules/post/application/use-cases/GetUserCommentLikesByPost";
import { LikeComment } from "@/modules/post/application/use-cases/LikeComment";
import { LikePost } from "@/modules/post/application/use-cases/LikePost";
import { ReplyComment } from "@/modules/post/application/use-cases/ReplyComment";
import { UnLikeComment } from "@/modules/post/application/use-cases/UnLikeComment";
import { UnLikePost } from "@/modules/post/application/use-cases/UnLikePost";
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
container.bind(GetPostById).toSelf();
container.bind(LikePost).toSelf();
container.bind(GetLikeByUserAndPost).toSelf();
container.bind(UnLikePost).toSelf();
container.bind(GetPostComments).toSelf();
container.bind(CommentPost).toSelf();
container.bind(ReplyComment).toSelf();
container.bind(LikeComment).toSelf();
container.bind(UnLikeComment).toSelf();
container.bind(GetUserCommentLikesByPost).toSelf();
container.bind(DeletePost).toSelf();
container.bind(GetPostsByCriteria).toSelf();

export const getTrendingPostUseCase = container.get(GetTrendingPost);
export const getCommunityHighlightsUseCase = container.get(
  GetCommunityHighlights,
);
export const createPostUseCase = container.get(CreatePost);
export const getPostByIdUseCase = container.get(GetPostById);
export const likePostUseCase = container.get(LikePost);
export const getLikeByUserAndPostUseCase = container.get(GetLikeByUserAndPost);
export const unLikePostUseCase = container.get(UnLikePost);
export const getPostCommentsUseCase = container.get(GetPostComments);
export const commentPostUseCase = container.get(CommentPost);
export const replyCommentUseCase = container.get(ReplyComment);
export const likeCommentUseCase = container.get(LikeComment);
export const unLikeCommmentUseCase = container.get(UnLikeComment);
export const getUserCommentLikesByPostUseCase = container.get(
  GetUserCommentLikesByPost,
);
export const deletePostUseCase = container.get(DeletePost);
export const getPostsByCriteriaUseCase = container.get(GetPostsByCriteria);
