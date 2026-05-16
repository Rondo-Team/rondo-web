import styles from "./DraftMediumCard.module.css";

interface DraftMediumCardProps {
  title: string;
  description: string;
}

export const DraftMediumCard = ({
  title,
  description,
}: DraftMediumCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardInfo}>
        <h1 className={styles.draftTitle}>{title}</h1>
        <p className={styles.draftDescription}>{description}</p>
      </div>
      <p className={styles.seeMoreText}>See details</p>
    </div>
  );
};
