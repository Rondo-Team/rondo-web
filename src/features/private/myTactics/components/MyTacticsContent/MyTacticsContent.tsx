import { Accordion } from "@/components/Accordion";
import { DraftsContainer } from "@/features/private/myTactics/components/MyTacticsContent/components/DraftsContainer";
import { DraftsContainerSkeleton } from "@/features/private/myTactics/components/MyTacticsContent/components/DraftsContainer/DraftsContainerSkeleton";
import { PostsContainer } from "@/features/private/myTactics/components/MyTacticsContent/components/PostsContainer";
import { PostsContainerSkeleton } from "@/features/private/myTactics/components/MyTacticsContent/components/PostsContainer/PostsContainerSkeleton/PostsContainerSkeleton";
import { ProposalsContainer } from "@/features/private/myTactics/components/MyTacticsContent/components/ProposalsContainer/ProposalsContainer";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";
import styles from "./MyTacticsContent.module.css";

export const MyTacticsContent = async () => {
  const t = await getTranslations("myTactics");
  return (
    <div className={styles.myTacticsContainer}>
      <Accordion
        title={t("drafts.title")}
        description={t("drafts.description")}
      >
        <div className={styles.accordionContent}>
          <Suspense fallback={<DraftsContainerSkeleton />}>
            <DraftsContainer />
          </Suspense>
        </div>
      </Accordion>

      <Accordion
        title={t("proposals.title")}
        description={t("proposals.description")}
      >
        <div className={styles.accordionContent}>
          <Suspense fallback={<PostsContainerSkeleton />}>
            <ProposalsContainer />
          </Suspense>
        </div>
      </Accordion>

      <Accordion
        title={t("tactics.title")}
        description={t("tactics.description")}
        defaultOpen
      >
        <div className={styles.accordionContent}>
          <Suspense fallback={<PostsContainerSkeleton />}>
            <PostsContainer />
          </Suspense>
        </div>
      </Accordion>
    </div>
  );
};
