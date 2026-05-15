import { PostMediumCardSkeleton } from "@/components/PostMediumCard";
import styles from "../CommunityPosts/CommunityPosts.module.css";

export const CommunityPostsSkeleton = () => {
  return (
    <div className={styles.postsContainer} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <PostMediumCardSkeleton key={index} />
      ))}
    </div>
  );
};
