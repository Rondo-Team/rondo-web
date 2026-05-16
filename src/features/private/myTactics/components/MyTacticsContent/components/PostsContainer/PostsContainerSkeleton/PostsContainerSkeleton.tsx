import { PostMediumCardSkeleton } from "@/components/PostMediumCard";
import styles from "../PostsContainer.module.css";

export const PostsContainerSkeleton = () => {
  return (
    <div className={styles.postsContainer} aria-hidden="true">
      {Array.from({ length: 9 }).map((_, index) => (
        <PostMediumCardSkeleton key={index} />
      ))}
    </div>
  );
};
