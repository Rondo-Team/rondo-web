import { CommunitySearch } from "@/features/private/community/components/CommunityContent/components/CommunitySearch";
import styles from "./CommunityContent.module.css";

export const CommunityContent = () => {
  return (
    <div className={styles.communityContentContainer}>
      <CommunitySearch />
    </div>
  );
};
