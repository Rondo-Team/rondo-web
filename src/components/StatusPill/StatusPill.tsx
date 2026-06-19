import { startCaseText } from "@/utils/startCaseText";
import styles from "./StatusPill.module.css";

interface StatusPillProps {
  text: string;
  type: "primary" | "secondary";
  size?: "small" | "big";
}

export const StatusPill = ({ text, type, size = "small" }: StatusPillProps) => {
  const formattedText = startCaseText(text);
  return (
    <div className={`${styles.pillContainer} ${styles[type]} ${styles[size]}`}>
      <p className={styles.pillText}>{formattedText}</p>
    </div>
  );
};
