import type { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import { Token } from "@/modules/shared/domain/Token";
import { Play } from "@/types/Play";
import { inject } from "inversify";

export class UpdatePost {
  constructor(
    @inject(Token.POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async run(
    id: string,
    title?: string,
    description?: string,
    tags?: string[],
    play?: Play,
  ) {
    return await this.postRepository.editPost(
      { id },
      {
        title,
        description,
        tags,
        play,
      },
    );
  }
}
