import type { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class GetPostsByUserId {
  constructor(
    @inject(Token.POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async run(userId: string) {
    return await this.postRepository.getPostsByUserId({
      userId,
    });
  }
}
