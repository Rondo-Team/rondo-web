import styles from "./CommentIcon.module.css";

interface CommentIconProps {
  text?: string;
  color?: string;
}

export const CommentIcon = ({
  text,
  color = "currentColor",
}: CommentIconProps) => {
  return (
    <div className={styles.iconContainer}>
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.75 4H13.75C14.1642 4 14.5 4.33579 14.5 4.75V13L12.0002 10.9232C11.8656 10.8114 11.6956 10.75 11.5205 10.75H5.5C5.08579 10.75 4.75 10.4142 4.75 10V7.75M10.75 4V1.75C10.75 1.33579 10.4142 1 10 1H1.75C1.33579 1 1 1.33579 1 1.75V10.0002L3.49976 7.92311C3.63441 7.81124 3.80443 7.75 3.97949 7.75H4.75M10.75 4V7C10.75 7.41421 10.4142 7.75 10 7.75H4.75"
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
