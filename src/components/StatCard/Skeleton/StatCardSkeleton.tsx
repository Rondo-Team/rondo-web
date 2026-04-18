import styles from "./StatCardSkeleton.module.css";

export const StatCardSkeleton = () => {
  return <div className={styles.cardSkeleton} aria-hidden="true" />;
};
