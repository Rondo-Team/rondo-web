import { PlusIcon } from "@/components/Icons/PlusIcon";
import styles from "./NewPlayButton.module.css";

interface NewPlayButtonProps {
  text: string;
}

export const NewPlayButton = ({ text }: NewPlayButtonProps) => {
  return (
    <div className={styles.newPlayButtonContainer}>
      <p>{text}</p>
      <PlusIcon />
    </div>
  );
};
