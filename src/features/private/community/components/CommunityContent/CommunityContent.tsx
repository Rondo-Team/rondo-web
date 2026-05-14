import { PostMediumCard } from "@/components/PostMediumCard";
import { CommunityPagination } from "@/features/private/community/components/CommunityContent/components/CommunityPagination";
import { CommunitySearch } from "@/features/private/community/components/CommunityContent/components/CommunitySearch";
import { getPostsByCriteria } from "@/features/private/community/components/CommunityContent/queries/getPostsByCriteria";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Link from "next/link";
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

export const CommunityContent = async ({
  page,
  sortBy,
  sortOrder,
  query,
  tags,
  minCreationDate,
  minFavourites,
}: CommunityContentProps) => {
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

  return (
    <div className={styles.communityContentContainer}>
      <CommunitySearch />
      {posts.items.length === 0 ? (
        <div>Could not find posts</div>
      ) : (
        <div className={styles.postAndPagination}>
          <div className={styles.postsContainer}>
            {posts.items.map((post) => (
              <Link href={`${AppSectionsRoutes.POST}/${post.id}`} key={post.id}>
                <PostMediumCard
                  author={post.user.name}
                  comments={post.commentsCount}
                  description={post.description}
                  favourites={post.favouritesCount}
                  proposals={post.proposalsCount}
                  title={post.title}
                  username={post.user.username}
                />
              </Link>
            ))}
          </div>
          <CommunityPagination total={totalPages} />
        </div>
      )}
    </div>
  );
};
