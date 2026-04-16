import { formatText } from "@/utils/formatText";
import styles from "./StatusPill.module.css";

interface StatusPillProps {
  text: string;
  type: "primary" | "secondary";
}

export const StatusPill = ({ text, type }: StatusPillProps) => {
  const formattedText = formatText(text);
  return (
    <div className={`${styles.pillContainer} ${styles[type]}`}>
      <p className={styles.pillText}>{formattedText}</p>
    </div>
  );
};
