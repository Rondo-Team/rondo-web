import type { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class LikePost {
  constructor(
    @inject(Token.POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async run(id: string, postId: string) {
    return await this.postRepository.likePost({
      id,
      postId,
    });
  }
}
