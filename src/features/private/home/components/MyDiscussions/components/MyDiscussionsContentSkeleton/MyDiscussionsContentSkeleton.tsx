import { ProposalLargeCardSkeleton } from "@/components/ProposalLargeCard";
import styles from "./MyDiscussionsContentSkeleton.module.css";

export const MyDiscussionsContentSkeleton = () => {
  return (
    <div className={styles.myDiscussionsContainer} aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <ProposalLargeCardSkeleton key={index} />
      ))}
    </div>
  );
};
