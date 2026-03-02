import { Avatar } from "@/components/Avatar";
import styles from "./UserProfile.module.css";

export const UserProfile = () => {
  return (
    <div className={styles.userProfileContainer}>
      <Avatar initials="GD" />
      <p>guillebricio</p>
    </div>
  );
};
