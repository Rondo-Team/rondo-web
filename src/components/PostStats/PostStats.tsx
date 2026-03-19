import { CommentIcon } from "@/components/Icons/CommentIcon";
import { HeartIcon } from "@/components/Icons/HeartIcon";
import { ProposalIcon } from "@/components/Icons/ProposalIcon";
import styles from "./PostStats.module.css";

interface PostStatsProps {
  favouritesCount: number;
  commentsCount: number;
  proposalsCount: number;
}

export const PostStats = ({
  favouritesCount,
  commentsCount,
  proposalsCount,
}: PostStatsProps) => {
  return (
    <div className={styles.postStats}>
      <HeartIcon
        text={favouritesCount.toString()}
        color="rgba(255, 0, 0, 0.7)"
      />
      <CommentIcon text={commentsCount.toString()} color="rgba(0,0,0,0.7)" />
      <ProposalIcon
        text={proposalsCount.toString()}
        color="rgba(61, 118, 0, 0.7)"
      />
    </div>
  );
};
