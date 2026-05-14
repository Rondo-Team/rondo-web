import { ChevronDownIcon } from "@/components/Icons/ChevronDownIcon";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  page,
  total,
  onChange,
  className,
}: PaginationProps) => {
  const safeTotal = Math.max(total, 1);
  const safeCurrentPage = Math.min(Math.max(page, 1), safeTotal);

  return (
    <div className={`${styles.paginationContainer} ${className ?? ""}`.trim()}>
      <button
        type="button"
        className={styles.chevronButton}
        disabled={safeCurrentPage <= 1}
        onClick={() => onChange(safeCurrentPage - 1)}
        aria-label="Previous page"
      >
        <span className={styles.leftChevron}>
          <ChevronDownIcon />
        </span>
      </button>

      <span className={styles.pageIndicator} aria-live="polite">
        {safeCurrentPage}/{safeTotal}
      </span>

      <button
        type="button"
        className={styles.chevronButton}
        disabled={safeCurrentPage >= safeTotal}
        onClick={() => onChange(safeCurrentPage + 1)}
        aria-label="Next page"
      >
        <span className={styles.rightChevron}>
          <ChevronDownIcon />
        </span>
      </button>
    </div>
  );
};
