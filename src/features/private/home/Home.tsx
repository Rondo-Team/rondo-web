import { CommunityHighlights } from "@/features/private/home/components/CommunityHighlights";
import { TrendingPost } from "@/features/private/home/components/TrendingPost";
import styles from "./Home.module.css";

export const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <TrendingPost />
      <CommunityHighlights />
    </div>
  );
};
