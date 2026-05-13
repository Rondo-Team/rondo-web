import { Button } from "@/components/Button/Button";
import { TitleSubtitle } from "@/components/TitleSubtitle";
import { CommunityHighlightsContent } from "@/features/private/home/components/CommunityHighlights/components/CommunityHighlightsContent";
import { CommunityHighlightsContentSkeleton } from "@/features/private/home/components/CommunityHighlights/components/CommunityHighlightsContentSkeleton";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./CommunityHighlights.module.css";

export const CommunityHighlights = async () => {
  const t = await getTranslations("homePage.communityHighlights");
  return (
    <div className={styles.communityHighlightsContainer}>
      <TitleSubtitle title={t("title")} subtitle={t("subtitle")} />
      <div className={styles.communityHighlightsDivisor}>
        <Suspense fallback={<CommunityHighlightsContentSkeleton />}>
          <CommunityHighlightsContent />
        </Suspense>
        <Button>
          <Link href={AppSectionsRoutes.COMMUNITY}>{t("discover")}</Link>
        </Button>
      </div>
    </div>
  );
};
