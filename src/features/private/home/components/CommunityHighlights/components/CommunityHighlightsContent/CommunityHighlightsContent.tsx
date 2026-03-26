import { PostMediumCard } from "@/components/PostMediumCard";
import { getCommunityHighlights } from "@/features/private/home/components/CommunityHighlights/components/CommunityHighlightsContent/queries/getCommunityHighlights";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Link from "next/link";
import styles from "./CommunityHighlighsContent.module.css";

export const CommunityHighlightsContent = async () => {
  const communityHighlights = await getCommunityHighlights();
  if (!communityHighlights) return <p>There are no posts yet</p>;
  return (
    <div className={styles.communityHighlightsContainer}>
      {communityHighlights.items.map((post) => {
        return (
          <Link href={`${AppSectionsRoutes.POST}/${post.id}`} key={post.id}>
            <PostMediumCard
              title={post.title}
              description={post.description}
              favourites={post.favouritesCount}
              comments={post.commentsCount}
              proposals={post.proposalsCount}
              author={post.user.name}
              username={post.user.username}
              profilePicture={post.user.profilePicture}
            />
          </Link>
        );
      })}
    </div>
  );
};
