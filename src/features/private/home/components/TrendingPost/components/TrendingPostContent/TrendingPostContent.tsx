import { PostLargeCard } from "@/components/PostLargeCard";
import { getTrendingPost } from "@/features/private/home/components/TrendingPost/components/TrendingPostContent/queries/getTrendingPost";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import styles from "./TrendingPostContent.module.css"

export const TrendingPostContent = async () => {
  const t = await getTranslations("homePage.trendingPost");
  const trendingPost = await getTrendingPost();
  if (!trendingPost) return <p>{t("error")}</p>;
  return (
    <Link href={`${AppSectionsRoutes.POST}/${trendingPost.id}`} className={styles.postContainer}>
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
