import styles from "./ProposalIcon.module.css";

interface ProposalIcon {
  text?: string;
  color?: string;
}

export const ProposalIcon = ({
  text,
  color = "currentColor",
}: ProposalIcon) => {
  return (
    <div className={styles.iconContainer}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4.84099 10.659C4.43382 10.2518 3.87132 10 3.25 10C2.00736 10 1 11.0074 1 12.25C1 13.4926 2.00736 14.5 3.25 14.5C4.49264 14.5 5.5 13.4926 5.5 12.25C5.5 11.6287 5.24816 11.0662 4.84099 10.659ZM4.84099 10.659L10.659 4.84099M10.659 4.84099C11.0662 5.24816 11.6287 5.5 12.25 5.5C13.4926 5.5 14.5 4.49264 14.5 3.25C14.5 2.00736 13.4926 1 12.25 1C11.0074 1 10 2.00736 10 3.25C10 3.87132 10.2518 4.43382 10.659 4.84099ZM10.659 4.84099L10.6621 4.83789"
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
