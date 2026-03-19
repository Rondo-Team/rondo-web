export type PaginatedResponse<T> = {
  items: T[];
  limit: number;
  page: number;
  total: number;
};
