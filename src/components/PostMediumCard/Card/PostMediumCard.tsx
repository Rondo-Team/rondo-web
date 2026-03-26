import { PostStats } from "@/components/PostStats";
import { UserProfile } from "@/components/UserProfile";
import styles from "./PostMediumCard.module.css";

interface PostMediumCardProps {
  title: string;
  description: string;
  favourites: number;
  comments: number;
  proposals: number;
  author: string;
  username: string;
  profilePicture?: string;
}

export const PostMediumCard = ({
  title,
  description,
  favourites,
  comments,
  proposals,
  author,
  username,
}: PostMediumCardProps) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardInfo}>
        <UserProfile name={author} username={username} />
        <div>
          <h1 className={styles.postTitle}>{title}</h1>
          <p className={styles.postDescription}>{description}</p>
        </div>
      </div>
      <div className={styles.footerSection}>
        <PostStats
          favouritesCount={favourites}
          commentsCount={comments}
          proposalsCount={proposals}
        />
        <p className={styles.seeMoreText}>See details</p>
      </div>
    </div>
  );
};
