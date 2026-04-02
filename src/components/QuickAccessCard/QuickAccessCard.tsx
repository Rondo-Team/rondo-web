import styles from "./QuickAccessCard.module.css";

interface QuickAccessCardProps {
  title: string;
  openedAt: string;
}

export const QuickAccessCard = ({ title, openedAt }: QuickAccessCardProps) => {
  return (
    <div className={styles.quickAccessContainer}>
      <h1 className={styles.quickAccessTitle}>{title}</h1>
      <p className={styles.quickAccessDate}>{openedAt}</p>
    </div>
  );
};
