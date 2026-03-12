import { CommentIcon } from "@/components/Icons/CommentIcon";
import { HeartIcon } from "@/components/Icons/HeartIcon/HeartIcon";
import { ProposalIcon } from "@/components/Icons/ProposalIcon";
import { Tag } from "@/components/Tag";
import { UserProfile } from "@/components/UserProfile";
import { getTrendingPost } from "@/features/private/home/components/TrendingPost/components/TrendingPostContent/queries/getTrendingPost";
import styles from "./TrendingPostContent.module.css";

export const TrendingPostContent = async () => {
  const trendingPost = await getTrendingPost();
  if (!trendingPost) return <p>There are no posts yet</p>;
  return (
    <div className={styles.trendingPostContainer}>
      <div>
        <h1 className={styles.trendingPostTitle}>{trendingPost.title}</h1>
        <p className={styles.trendingPostDescription}>
          {trendingPost.description}
        </p>
      </div>
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
      <div className={styles.trendingPostTags}>
        {trendingPost.tags.map((tag) => (
          <Tag text={tag} key={tag} />
        ))}
      </div>
      <div className={styles.footerContainer}>
        <UserProfile
          name={trendingPost.user.name}
          username={trendingPost.user.username}
        />
        <p>See more!</p>
      </div>
    </div>
  );
};
