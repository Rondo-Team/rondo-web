import styles from "./Timeline.module.css";

interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

interface TimelineItemProps {
  children: React.ReactNode;
}

export const Timeline = ({ children, className }: TimelineProps) => (
  <ol className={`${styles.timeline}${className ? ` ${className}` : ""}`}>
    {children}
  </ol>
);

export const TimelineItem = ({ children }: TimelineItemProps) => (
  <li className={styles.item}>
    <span className={styles.marker} aria-hidden="true" />
    <div className={styles.itemContent}>{children}</div>
  </li>
);
