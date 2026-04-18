import styles from "./QuickAccessCardSkeleton.module.css";

export const QuickAccessCardSkeleton = () => {
  return <div className={styles.cardSkeleton} aria-hidden="true" />;
};
