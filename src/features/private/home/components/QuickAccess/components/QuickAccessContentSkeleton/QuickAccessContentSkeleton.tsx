import { QuickAccessCardSkeleton } from "@/components/QuickAccessCard";
import styles from "../QuickAccessContent/QuickAccessContent.module.css";

export const QuickAccessContentSkeleton = () => {
  return (
    <div className={styles.quickAccesContentContainer} aria-hidden="true">
      {Array.from({ length: 4 }).map((_, index) => (
        <QuickAccessCardSkeleton key={index} />
      ))}
    </div>
  );
};
