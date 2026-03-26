import { Button } from "@/components/Button/Button";
import { TitleSubtitle } from "@/components/TitleSubtitle";
import { CommunityHighlightsContent } from "@/features/private/home/components/CommunityHighlights/components/CommunityHighlightsContent";
import { CommunityHighlightsContentSkeleton } from "@/features/private/home/components/CommunityHighlights/components/CommunityHighlightsContentSkeleton";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Link from "next/link";
import { Suspense } from "react";
import styles from "./CommunityHighlights.module.css";

export const CommunityHighlights = () => {
  return (
    <div className={styles.communityHighlightsContainer}>
      <TitleSubtitle
        title="Community highlights"
        subtitle="What coaches around the world are creating today."
      />
      <div className={styles.communityHighlightsDivisor}>
        <Suspense fallback={<CommunityHighlightsContentSkeleton />}>
          <CommunityHighlightsContent />
        </Suspense>
        <Button>
          <Link href={AppSectionsRoutes.DISCOVER}>Discover more!</Link>
        </Button>
      </div>
    </div>
  );
};
