import { startCaseText } from "@/utils/startCaseText";
import styles from "./StatusPill.module.css";

interface StatusPillProps {
  text: string;
  type: "primary" | "secondary";
}

export const StatusPill = ({ text, type }: StatusPillProps) => {
  const formattedText = startCaseText(text);
  return (
    <div className={`${styles.pillContainer} ${styles[type]}`}>
      <p className={styles.pillText}>{formattedText}</p>
    </div>
  );
};
