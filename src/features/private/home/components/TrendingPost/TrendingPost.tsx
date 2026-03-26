import { TitleSubtitle } from "@/components/TitleSubtitle";
import { TrendingPostContent } from "@/features/private/home/components/TrendingPost/components/TrendingPostContent";
import { TrendingPostContentSkeleton } from "@/features/private/home/components/TrendingPost/components/TrendingPostContentSkeleton";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import styles from "./TrendingPost.module.css";

export const TrendingPost = async () => {
  const t = await getTranslations("homePage.trendingPost");
  return (
    <div className={styles.trendingPlayContainer}>
      <TitleSubtitle title={t("title")} subtitle={t("subtitle")} />
      <div className={styles.trendingPostDivisor}>
        <Suspense fallback={<TrendingPostContentSkeleton />}>
          <TrendingPostContent />
        </Suspense>
      </div>
    </div>
  );
};
