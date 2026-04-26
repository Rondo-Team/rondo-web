import { PostFavourite } from "@/modules/post/domain/value-object/PostFavourite";
import { GetLikeByUserAndPostResponseDTO } from "@/modules/post/infrastructure/dtos/GetLikeByUserAndPostResponseDTO";

export const getFavouriteMapper = (
  dto: GetLikeByUserAndPostResponseDTO,
): PostFavourite => {
  return {
    id: dto.id,
    createdAt: dto.createdAt,
    postId: dto.postId,
    userId: dto.userId,
  };
};
