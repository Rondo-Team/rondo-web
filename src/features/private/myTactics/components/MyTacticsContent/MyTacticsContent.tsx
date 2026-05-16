import { Accordion } from "@/components/Accordion";
import { DraftsContainer } from "@/features/private/myTactics/components/MyTacticsContent/components/DraftsContainer";
import { DraftsContainerSkeleton } from "@/features/private/myTactics/components/MyTacticsContent/components/DraftsContainer/DraftsContainerSkeleton";
import { PostsContainer } from "@/features/private/myTactics/components/MyTacticsContent/components/PostsContainer";
import { PostsContainerSkeleton } from "@/features/private/myTactics/components/MyTacticsContent/components/PostsContainer/PostsContainerSkeleton/PostsContainerSkeleton";
import { ProposalsContainer } from "@/features/private/myTactics/components/MyTacticsContent/components/ProposalsContainer/ProposalsContainer";
import { Suspense } from "react";
import styles from "./MyTacticsContent.module.css";

export const MyTacticsContent = () => {
  return (
    <div className={styles.myTacticsContainer}>
      <Accordion
        title="My drafts"
        description="Your plays in progress, ready to edit and publish."
      >
        <div className={styles.accordionContent}>
          <Suspense fallback={<DraftsContainerSkeleton />}>
            <DraftsContainer />
          </Suspense>
        </div>
      </Accordion>

      <Accordion
        title="My proposals"
        description="Check your reviews to another plays"
      >
        <div className={styles.accordionContent}>
          <Suspense fallback={<PostsContainerSkeleton />}>
            <ProposalsContainer />
          </Suspense>
        </div>
      </Accordion>

      <Accordion
        title="My tactics"
        description="Your plays in progress, ready to edit and publish."
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
