import { getPostsByCriteriaUseCase } from "@/modules/post/PostModule";
import { DEFAULT_SEARCH_ITEMS_LIMIT } from "@/modules/shared/domain/consts";

export const getPostsByCriteria = async (
  page: number,
  sortBy?: string,
  sortOrder?: string,
  query?: string,
  tags?: string[],
  minCreationDate?: string,
  minFavourites?: number,
) => {
  try {
    return await getPostsByCriteriaUseCase.run(
      page,
      DEFAULT_SEARCH_ITEMS_LIMIT,
      sortBy,
      sortOrder,
      query,
      tags,
      minCreationDate,
      minFavourites,
    );
  } catch (err) {
    return null;
  }
};
