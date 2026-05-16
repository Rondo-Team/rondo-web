import { useTranslations } from "next-intl";
import styles from "./DraftMediumCard.module.css";

interface DraftMediumCardProps {
  title: string;
  description: string;
}

export const DraftMediumCard = ({
  title,
  description,
}: DraftMediumCardProps) => {
  const t = useTranslations("components.draft.mediumCard")
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardInfo}>
        <h1 className={styles.draftTitle}>{title}</h1>
        <p className={styles.draftDescription}>{description}</p>
      </div>
      <p className={styles.seeMoreText}>{t("seeDetails")}</p>
    </div>
  );
};
