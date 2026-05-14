import type { PostRepository } from "@/modules/post/domain/repositories/PostRepository";
import { Token } from "@/modules/shared/domain/Token";
import { inject } from "inversify";

export class GetPostsByCriteria {
  constructor(
    @inject(Token.POST_REPOSITORY)
    private readonly postRepository: PostRepository,
  ) {}

  async run(
    page: number,
    limit: number,
    sortBy?: string,
    sortOrder?: string,
    query?: string,
    tags?: string[],
    minCreationDate?: string,
    minFavourites?: number,
  ) {
    return await this.postRepository.getPostsByCriteria({
      page,
      limit,
      sortBy,
      sortOrder,
      query,
      tags,
      minCreationDate,
      minFavourites,
    });
  }
}
