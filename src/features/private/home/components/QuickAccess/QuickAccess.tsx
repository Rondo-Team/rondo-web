import { TitleSubtitle } from "@/components/TitleSubtitle";
import { QuickAccessContent } from "@/features/private/home/components/QuickAccess/components/QuickAccessContent";
import { QuickAccessContentSkeleton } from "@/features/private/home/components/QuickAccess/components/QuickAccessContentSkeleton";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import styles from "./QuickAccess.module.css";

export const QuickAccess = async () => {
  const t = await getTranslations("homePage.quickAccess");
  return (
    <div className={styles.quickAccessContainer}>
      <TitleSubtitle title={t("title")} subtitle={t("subtitle")} />
      <div className={styles.quickAccessDivisor}>
        <Suspense fallback={<QuickAccessContentSkeleton />}>
          <QuickAccessContent />
        </Suspense>
      </div>
    </div>
  );
};
