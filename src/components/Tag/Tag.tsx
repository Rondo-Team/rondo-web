import styles from "./Tag.module.css";

interface TagProps {
  text: string;
}

export const Tag = ({ text }: TagProps) => {
  return (
    <div className={styles.tagContainer}>
      <span>{text}</span>
    </div>
  );
};
