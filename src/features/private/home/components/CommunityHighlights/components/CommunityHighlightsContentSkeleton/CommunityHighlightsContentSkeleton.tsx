import { PostMediumCardSkeleton } from "@/components/PostMediumCard";
import styles from "./CommunityHighlightsContentSkeleton.module.css";

export const CommunityHighlightsContentSkeleton = () => {
  return (
    <div className={styles.communityHighlightsContainer} aria-hidden="true">
      <PostMediumCardSkeleton />
      <PostMediumCardSkeleton />
      <PostMediumCardSkeleton />
    </div>
  );
};
