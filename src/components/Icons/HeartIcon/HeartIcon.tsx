import styles from "./HeartIcon.module.css";

interface HeartIconProps {
  text?: string;
  color?: string;
  filled?: boolean;
}

export const HeartIcon = ({
  text,
  color = "currentColor",
  filled = false,
}: HeartIconProps) => {
  return (
    <div className={styles.iconContainer}>
      <svg
        width="16"
        height="14"
        viewBox="0 0 15 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.5 3.1157C6 -0.40512 0.75 -0.0301201 0.75 4.4699C0.75 8.96989 7.5 12.72 7.5 12.72C7.5 12.72 14.25 8.96989 14.25 4.4699C14.25 -0.0301201 9 -0.40512 7.5 3.1157Z"
          fill={filled ? color : "none"}
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
