import { CommunityPostsAndPagination } from "@/features/private/community/components/CommunityContent/components/CommunityPostsAndPagination";
import { CommunityPostsSkeleton } from "@/features/private/community/components/CommunityContent/components/CommunityPostsAndPagination/components";
import { CommunitySearch } from "@/features/private/community/components/CommunityContent/components/CommunitySearch";
import { Suspense } from "react";
import styles from "./CommunityContent.module.css";

interface CommunityContentProps {
  page: number;
  sortBy?: string;
  sortOrder?: string;
  query?: string;
  tags?: string[];
  minCreationDate?: string;
  minFavourites?: number;
}

export const CommunityContent = ({
  page,
  sortBy,
  sortOrder,
  query,
  tags,
  minCreationDate,
  minFavourites,
}: CommunityContentProps) => {
  return (
    <div className={styles.communityContentContainer}>
      <CommunitySearch />
      <Suspense
        fallback={<CommunityPostsSkeleton />}
        //key={`${page}-${sortBy}-${sortOrder}-${query}-${tags}-${minCreationDate}-${minFavourites}`}
      >
        <CommunityPostsAndPagination
          page={page}
          sortBy={sortBy}
          sortOrder={sortOrder}
          query={query}
          tags={tags}
          minCreationDate={minCreationDate}
          minFavourites={minFavourites}
        />
      </Suspense>
    </div>
  );
};
