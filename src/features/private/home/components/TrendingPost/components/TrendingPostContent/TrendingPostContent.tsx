import { CommentIcon } from "@/components/Icons/CommentIcon";
import { HeartIcon } from "@/components/Icons/HeartIcon/HeartIcon";
import { ProposalIcon } from "@/components/Icons/ProposalIcon";
import { TitleSubtitle } from "@/components/TitleSubtitle";
import { getTrendingPost } from "@/features/private/home/components/TrendingPost/components/TrendingPostContent/queries/getTrendingPost";
import styles from "./TrendingPostContent.module.css";

export const TrendingPostContent = async () => {
  const trendingPost = await getTrendingPost();
  if (!trendingPost) return <p>There are no posts yet</p>;
  return (
    <div>
      <TitleSubtitle
        title={trendingPost.title}
        subtitle={trendingPost.description}
        titleLineClamp
        subtitleLineClamp
      />
      <div className={styles.postStats}>
        <HeartIcon
          text={trendingPost.favouritesCount.toString()}
          color="rgba(255, 0, 0, 0.7)"
        />
        <CommentIcon
          text={trendingPost.commentsCount.toString()}
          color="rgba(0,0,0,0.7)"
        />
        <ProposalIcon
          text={trendingPost.proposalsCount.toString()}
          color="rgba(61, 118, 0, 0.7)"
        />
      </div>
    </div>
  );
};
