import styles from "./PlusIcon.module.css";

interface PlusIconProps {
  text?: string;
  color?: string;
}

export const PlusIcon = ({ text, color = "currentColor" }: PlusIconProps) => {
  return (
    <div className={styles.iconContainer}>
      <svg
        width="16"
        height="14"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 8.75H8.75M8.75 8.75H16.5M8.75 8.75V16.5M8.75 8.75V1"
          stroke={color}
          strokeOpacity="1"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {text && <span style={{ color }}>{text}</span>}
    </div>
  );
};
