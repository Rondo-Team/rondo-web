export type GetPostsByCriteriaRequestDTO = {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: string;
  query?: string;
  tags?: string[];
  minCreationDate?: string;
  minFavourites?: number;
};
