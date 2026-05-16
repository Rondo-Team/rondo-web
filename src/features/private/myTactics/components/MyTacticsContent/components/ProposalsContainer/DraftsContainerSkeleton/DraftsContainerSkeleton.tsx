import { DraftMediumCardSkeleton } from "@/components/DraftMediumCard/Skeleton/DraftMediumCardSkeleton";
import styles from "../DraftsContainer.module.css";

export const DraftsContainerSkeleton = () => {
  return (
    <div className={styles.postsContainer} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <DraftMediumCardSkeleton key={index} />
      ))}
    </div>
  );
};
