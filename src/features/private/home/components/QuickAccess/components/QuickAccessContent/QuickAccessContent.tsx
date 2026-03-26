import { NewPlayButton } from "@/components/NewPlayButton";
import { QuickAccessCard } from "@/components/QuickAccessCard";
import { getUserRecentPlays } from "@/features/private/home/components/QuickAccess/components/QuickAccessContent/queries/getUserRecentPlays";
import styles from "./QuickAccessContent.module.css";

export const QuickAccessContent = async () => {
  const recentlyViewedPlays = await getUserRecentPlays();
  return (
    <div className={styles.quickAccesContentContainer}>
      {recentlyViewedPlays?.map((play) => (
        <QuickAccessCard key={play.id} />
      ))}
      <NewPlayButton />
    </div>
  );
};
