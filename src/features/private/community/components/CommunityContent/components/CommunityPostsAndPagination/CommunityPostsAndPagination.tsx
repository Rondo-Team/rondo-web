import { getPostsByCriteria } from "@/features/private/community/components/CommunityContent/components/CommunityPostsAndPagination/queries/getPostsByCriteria";
import styles from "../../CommunityContent.module.css";
import { CommunityPagination, CommunityPosts } from "./components";

interface CommunityPostsAndPaginationProps {
  page: number;
  sortBy?: string;
  sortOrder?: string;
  query?: string;
  tags?: string[];
  minCreationDate?: string;
  minFavourites?: number;
}

export const CommunityPostsAndPagination = async ({
  page,
  sortBy,
  sortOrder,
  query,
  tags,
  minCreationDate,
  minFavourites,
}: CommunityPostsAndPaginationProps) => {
  const posts = await getPostsByCriteria(
    page,
    sortBy,
    sortOrder,
    query,
    tags,
    minCreationDate,
    minFavourites,
  );

  if (!posts) return <div>Something went wrong</div>;

  const totalPages = Math.max(1, Math.ceil(posts.total / posts.limit));

  if (posts.items.length === 0) {
    return <div>Could not find posts</div>;
  }

  return (
    <div className={styles.postAndPagination}>
      <CommunityPosts posts={posts.items} />
      <CommunityPagination total={totalPages} />
    </div>
  );
};
