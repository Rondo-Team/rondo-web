import { PostStats } from "@/components/PostStats";
import { Tag } from "@/components/Tag";
import { UserProfile } from "@/components/UserProfile";
import styles from "./PostLargeCard.module.css";

interface PostLargeCardProps {
  title: string;
  description: string;
  favourites: number;
  comments: number;
  proposals: number;
  author: string;
  username: string;
  tags: string[];
  profilePicture?: string;
}
// Profile picture is not supported yet.
export const PostLargeCard = ({
  title,
  description,
  favourites,
  comments,
  proposals,
  author,
  username,
  tags,
}: PostLargeCardProps) => {
  return (
    <div className={styles.postLargeCardContainer}>
      <div className={styles.postInformation}>
        <div>
          <h1 className={styles.postTitle}>{title}</h1>
          <p className={styles.postDescription}>{description}</p>
        </div>
        <PostStats
          favouritesCount={favourites}
          commentsCount={comments}
          proposalsCount={proposals}
        />
        <div className={styles.postTags}>
          {tags.map((tag) => (
            <Tag text={tag} key={tag} />
          ))}
        </div>
      </div>
      <div className={styles.footerContainer}>
        <UserProfile name={author} username={username} />
        <p className={styles.seeMoreText}>See more!</p>
      </div>
    </div>
  );
};
