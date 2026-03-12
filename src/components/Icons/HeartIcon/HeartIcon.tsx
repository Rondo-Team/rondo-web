import styles from "./HeartIcon.module.css";

interface HeartIconProps {
  text?: string;
  color?: string;
}

export const HeartIcon = ({ text, color = "currentColor" }: HeartIconProps) => {
  return (
    <div className={styles.iconContainer}>
      <svg
        width="15"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 3.11567C6 -0.405151 0.75 -0.0301507 0.75 4.46987C0.75 8.96986 7.5 12.72 7.5 12.72C7.5 12.72 14.25 8.96986 14.25 4.46987C14.25 -0.0301507 9 -0.405151 7.5 3.11567Z"
          stroke={color}
          strokeOpacity="1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {text && <span style={{ color }}>{text}</span>}
    </div>
  );
};
