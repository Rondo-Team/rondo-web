import styles from "./ChevronDownIcon.module.css";

interface ChevronDownIconProps {
  expanded?: boolean;
}

export const ChevronDownIcon = ({ expanded = false }: ChevronDownIconProps) => {
  return (
    <svg
      className={`${styles.chevronIcon} ${expanded ? styles.chevronExpanded : ""}`}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 5.5L7 9L11 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
