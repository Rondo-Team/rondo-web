import { StatCardSkeleton } from "@/components/StatCard/Skeleton";
import styles from "../UserActivityContent/UserActivityContent.module.css";

export const UserActivityContentSkeleton = () => {
  return (
    <div className={styles.userActivityContentContainer} aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <StatCardSkeleton key={index} />
      ))}
    </div>
  );
};
