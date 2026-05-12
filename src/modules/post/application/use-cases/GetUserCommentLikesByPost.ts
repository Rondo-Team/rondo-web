import type { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class GetUserCommentLikesByPost {
  constructor(
    @inject(Token.POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async run(postId: string) {
    return await this.postRepository.getUserCommentLikesByPost({ postId });
  }
}
