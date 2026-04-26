import styles from "./ButtonSkeleton.module.css";

interface ButtonSkeletonProps {
  width?: string;
  height?: string;
}

export const ButtonSkeleton = ({
  width = "190px",
  height = "36px",
}: ButtonSkeletonProps) => {
  return (
    <div
      className={styles.buttonSkeleton}
      style={{ width, height }}
      aria-hidden="true"
    />
  );
};
