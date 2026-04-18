import styles from "./StatCard.module.css";

interface StatCardProps {
  value: number;
  description: string;
}

export const StatCard = ({ value, description }: StatCardProps) => {
  return (
    <div className={styles.statCardContainer}>
      <h1 className={styles.cardTitle}>{value}</h1>
      <p className={styles.cardDescription}>{description}</p>
    </div>
  );
};
