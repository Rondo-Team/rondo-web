import { Avatar } from "@/components/Avatar";
import { getInitialsFromName } from "@/utils/getInitialsFromName";
import styles from "./UserProfile.module.css";

interface UserProfileProps {
  name: string;
  username: string;
}

export const UserProfile = ({ name, username }: UserProfileProps) => {
  return (
    <div className={styles.userProfileContainer}>
      <Avatar initials={getInitialsFromName(name)} />
      <p>{username}</p>
    </div>
  );
};
