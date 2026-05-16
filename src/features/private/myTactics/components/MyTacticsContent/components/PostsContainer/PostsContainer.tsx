import { PostMediumCard } from "@/components/PostMediumCard";
import { getUserPosts } from "@/features/private/myTactics/components/MyTacticsContent/components/PostsContainer/queries/getUserPosts";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Link from "next/link";
import styles from "./PostsContainer.module.css";

export const PostsContainer = async () => {
  const posts = await getUserPosts();
  if (!posts) return <div>Could not fetch posts</div>;
  if (posts.length === 0) return <div>You dont have posts yet</div>;
  return (
    <div className={styles.postsContainer}>
      {posts.map((post) => (
        <Link href={`${AppSectionsRoutes.POST}/${post.id}`} key={post.id}>
          <PostMediumCard
            author={post.user.name}
            comments={post.commentsCount}
            description={post.description}
            title={post.title}
            favourites={post.favouritesCount}
            proposals={post.proposalsCount}
            username={post.user.username}
          />
        </Link>
      ))}
    </div>
  );
};
