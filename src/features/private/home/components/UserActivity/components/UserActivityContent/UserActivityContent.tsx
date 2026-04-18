import { StatCard } from "@/components/StatCard/Card";
import { getUserStats } from "@/features/private/home/components/UserActivity/components/UserActivityContent/queries/getUserStats";
import { getTranslations } from "next-intl/server";
import styles from "./UserActivityContent.module.css";

export const UserActivityContent = async () => {
  const t = await getTranslations("homePage.userActivity");
  const userStats = await getUserStats();
  if (!userStats) return <p>{t("error")}</p>;
  return (
    <div className={styles.userActivityContentContainer}>
      <StatCard value={userStats.postsCount} description={t("posts")} />
      <StatCard
        value={userStats.favouritePostsCount}
        description={t("favourites")}
      />
      <StatCard value={userStats.commentsCount} description={t("comments")} />
      <StatCard value={userStats.proposalsCount} description={t("proposals")} />
    </div>
  );
};
