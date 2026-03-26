import { PostLargeCard } from "@/components/PostLargeCard";
import { getTrendingPost } from "@/features/private/home/components/TrendingPost/components/TrendingPostContent/queries/getTrendingPost";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Link from "next/link";

export const TrendingPostContent = async () => {
  const trendingPost = await getTrendingPost();
  if (!trendingPost) return <p>There are no posts yet</p>;
  return (
    <Link href={`${AppSectionsRoutes.POST}/${trendingPost.id}`}>
      <PostLargeCard
        title={trendingPost.title}
        description={trendingPost.description}
        favourites={trendingPost.favouritesCount}
        comments={trendingPost.commentsCount}
        proposals={trendingPost.proposalsCount}
        author={trendingPost.user.name}
        username={trendingPost.user.username}
        tags={trendingPost.tags}
      />
    </Link>
  );
};
