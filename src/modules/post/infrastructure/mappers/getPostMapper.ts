import { PostDetail } from "@/modules/post/domain/value-object/PostDetail";
import { GetPostByIdResponseDTO } from "@/modules/post/infrastructure/dtos/GetPostByIdResponseDTO";

export const getPostMapper = (dto: GetPostByIdResponseDTO): PostDetail => {
  return {
    id: dto.id,
    title: dto.title,
    description: dto.description,
    favouritesCount: dto.favouritesCount,
    commentsCount: dto.commentsCount,
    proposalsCount: dto.proposalsCount,
    createdAt: dto.createdAt,
    tags: dto.tags,
    play: dto.play,
    user: {
      username: dto.user.username,
      name: dto.user.name,
      profilePicture: dto.user.profilePicture,
    },
  };
};
