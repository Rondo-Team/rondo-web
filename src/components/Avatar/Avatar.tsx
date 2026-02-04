import styles from "./Avatar.module.css";

interface AvatarProps {
  initials: string;
}

export const Avatar = ({ initials }: AvatarProps) => {
  return (
    <div className={styles.avatar}>
      <span className={styles.initials}>{initials}</span>
    </div>
  );
};
