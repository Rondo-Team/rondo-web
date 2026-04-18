import { CommunityHighlights } from "@/features/private/home/components/CommunityHighlights";
import { MyDiscussions } from "@/features/private/home/components/MyDiscussions";
import { QuickAccess } from "@/features/private/home/components/QuickAccess/QuickAccess";
import { TrendingPost } from "@/features/private/home/components/TrendingPost";
import { UserActivity } from "@/features/private/home/components/UserActivity/UserActivity";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <TrendingPost />
      <CommunityHighlights />
      <QuickAccess />
      <MyDiscussions />
      <UserActivity />
    </div>
  );
};
