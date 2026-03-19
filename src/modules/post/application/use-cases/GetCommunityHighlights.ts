import type { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import {
  COMMUNITY_HIGHLIGHT_DEFAULT_LIMIT,
  COMMUNITY_HIGHLIGHT_DEFAULT_PAGE,
} from "@/modules/shared/domain/consts";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class GetCommunityHighlights {
  constructor(
    @inject(Token.POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async run() {
    return await this.postRepository.getCommunityHighlights({
      page: COMMUNITY_HIGHLIGHT_DEFAULT_PAGE,
      limit: COMMUNITY_HIGHLIGHT_DEFAULT_LIMIT,
    });
  }
}
