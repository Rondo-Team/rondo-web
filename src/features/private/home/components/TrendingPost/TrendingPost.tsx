import { TitleSubtitle } from "@/components/TitleSubtitle";
import { TrendingPostContent } from "@/features/private/home/components/TrendingPost/components/TrendingPostContent";
import { TrendingPostContentSkeleton } from "@/features/private/home/components/TrendingPost/components/TrendingPostContentSkeleton";
import { Suspense } from "react";
import styles from "./TrendingPost.module.css";

export const TrendingPost = () => {
  return (
    <div className={styles.trendingPlayContainer}>
      <TitleSubtitle
        title="Trending this week"
        subtitle="Discover the most popular play of the week"
      />
      <Suspense fallback={<TrendingPostContentSkeleton />}>
        <TrendingPostContent />
      </Suspense>
    </div>
  );
};
