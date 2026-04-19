import styles from "./CloseIcon.module.css";

export const CloseIcon = () => {
  return (
    <span className={styles.iconContainer} aria-hidden="true">
      <span className={styles.crossBar} />
      <span className={styles.crossBar} />
    </span>
  );
};
