"use client";
import { PostMediumCard } from "@/components/PostMediumCard";
import { PostResume } from "@/modules/post/domain/value-object/PostResume";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Link from "next/link";
import styles from "./CommunityPosts.module.css";

interface CommunityPostsProps {
  posts: PostResume[];
}

export const CommunityPosts = ({ posts }: CommunityPostsProps) => {
  return (
    <div className={styles.postsContainer}>
      {posts.map((post) => (
        <Link href={`${AppSectionsRoutes.POST}/${post.id}`} key={post.id}>
          <PostMediumCard
            author={post.user.name}
            comments={post.commentsCount}
            description={post.description}
            favourites={post.favouritesCount}
            proposals={post.proposalsCount}
            title={post.title}
            username={post.user.username}
          />
        </Link>
      ))}
    </div>
  );
};
