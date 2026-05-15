import { CommunityContent } from "@/features/private/community/components/CommunityContent";

interface CommunityProps {
  page: number;
  sortBy?: string;
  sortOrder?: string;
  query?: string;
  tags?: string[];
  minCreationDate?: string;
  minFavourites?: number;
}

export const Community = ({
  page,
  sortBy,
  sortOrder,
  query,
  tags,
  minCreationDate,
  minFavourites,
}: CommunityProps) => {
  return (
    <CommunityContent
      page={page}
      sortBy={sortBy}
      sortOrder={sortOrder}
      query={query}
      tags={tags}
      minCreationDate={minCreationDate}
      minFavourites={minFavourites}
    />
  );
};
