import { UserActivityContent } from "@/features/private/home/components/UserActivity/components/UserActivityContent";
import { UserActivityContentSkeleton } from "@/features/private/home/components/UserActivity/components/UserActivityContentSkeleton";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import styles from "./UserActivity.module.css";

export const UserActivity = async () => {
  const t = await getTranslations("homePage.userActivity");
  return (
    <div className={styles.trendingPlayContainer}>
      <h1>
        {t.rich("title", {
          description: (chunks) => (
            <span className={styles.description}>{chunks}</span>
          ),
        })}
      </h1>
      <div className={styles.trendingPostDivisor}>
        <Suspense fallback={<UserActivityContentSkeleton />}>
          <UserActivityContent />
        </Suspense>
      </div>
    </div>
  );
};
