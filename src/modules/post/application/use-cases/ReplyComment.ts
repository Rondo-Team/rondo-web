import type { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class ReplyComment {
  constructor(
    @inject(Token.POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async run(id: string, parentId: string, postId: string, message: string) {
    return await this.postRepository.replyComment({
      id,
      parentId,
      postId,
      message,
    });
  }
}
