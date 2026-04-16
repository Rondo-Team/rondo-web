import { Button } from "@/components/Button/Button";
import { TitleSubtitle } from "@/components/TitleSubtitle";
import { MyDiscussionsContent } from "@/features/private/home/components/MyDiscussions/components/MyDiscussionsContent";
import { MyDiscussionsContentSkeleton } from "@/features/private/home/components/MyDiscussions/components/MyDiscussionsContentSkeleton";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./MyDiscussions.module.css";
import { getTranslations } from "next-intl/server";

export const MyDiscussions = async () => {
  const t = await getTranslations("homePage.myDiscussions")
  return (
    <div className={styles.myDiscussionsContainer}>
      <TitleSubtitle title={t("title")} subtitle={t("subtitle")} />
      <div className={styles.myDiscussionsDivisor}>
        <Suspense fallback={<MyDiscussionsContentSkeleton />}>
          <MyDiscussionsContent />
        </Suspense>
        <Button>
          <Link href={AppSectionsRoutes.MY_TACTICS}>{t("viewAll")}</Link>
        </Button>
      </div>
    </div>
  );
};
