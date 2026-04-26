"use client";

import { Button } from "@/components/Button/Button";
import { ButtonSkeleton } from "@/components/Button/Skeleton/ButtonSkeleton";
import { HeartIcon } from "@/components/Icons/HeartIcon";
import { TacticBoard } from "@/components/TacticBoard";
import { Tag } from "@/components/Tag";
import { TitleSubtitle } from "@/components/TitleSubtitle";
import { UserProfile } from "@/components/UserProfile";
import { PostDetail } from "@/modules/post/domain/value-object/PostDetail";
import { PostFavourite } from "@/modules/post/domain/value-object/PostFavourite";
import { useEffect, useState } from "react";
import styles from "./PostInformation.module.css";
import { getLikeByUserAndPost } from "./queries/getLikeByUserAndPost";
import { likePost } from "./queries/likePost";
import { unLikePost } from "./queries/unLikePost";

interface PostInformationProps {
  post: PostDetail;
}

export const PostInformation = ({ post }: PostInformationProps) => {
  const [markedAsFavourited, setMarkedAsFavourite] = useState(false);
  const [postFavourite, setPostFavourite] = useState<PostFavourite | null>(
    null,
  );
  const [favouritesCount, setFavouritesCount] = useState(post.favouritesCount);
  const [isLoadingFavourite, setIsLoadingFavourite] = useState(true);
  const [isUpdatingFavourite, setIsUpdatingFavourite] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFavourite = async () => {
      setIsLoadingFavourite(true);

      const favourite = await getLikeByUserAndPost(post.id);
      if (!isMounted) return;

      if (favourite) {
        setPostFavourite(favourite);
        setMarkedAsFavourite(true);
      } else {
        setPostFavourite(null);
        setMarkedAsFavourite(false);
      }

      setIsLoadingFavourite(false);
    };

    loadFavourite();

    return () => {
      isMounted = false;
    };
  }, [post.id]);

  const handleFavouriteToggle = async () => {
    if (isLoadingFavourite || isUpdatingFavourite) return;

    setIsUpdatingFavourite(true);

    if (markedAsFavourited) {
      if (postFavourite?.id) {
        const result = await unLikePost(postFavourite.id);
        if (result !== null) {
          setMarkedAsFavourite(false);
          setPostFavourite(null);
          setFavouritesCount((prev) => Math.max(0, prev - 1));
        }
      }

      setIsUpdatingFavourite(false);
      return;
    }

    const result = await likePost(post.id);
    if (result !== null) {
      setMarkedAsFavourite(true);
      setFavouritesCount((prev) => prev + 1);
      const favourite = await getLikeByUserAndPost(post.id);
      if (favourite) {
        setPostFavourite(favourite);
      }
    }

    setIsUpdatingFavourite(false);
  };

  return (
    <div className={styles.detailContainer}>
      <TitleSubtitle title={post.title} subtitle={post.description} />
      <UserProfile name={post.user.name} username={post.user.username} />
      <div className={styles.postTags}>
        {post.tags.map((tag) => (
          <Tag text={tag} key={tag} />
        ))}
      </div>
      {isLoadingFavourite ? (
        <div className={styles.buttonContent}>
          <ButtonSkeleton />
        </div>
      ) : (
        <Button onClick={handleFavouriteToggle} disabled={isUpdatingFavourite}>
          <div className={styles.buttonContent}>
            <div className={styles.favouritesStats}>
              <HeartIcon filled={markedAsFavourited} />
              <p>{favouritesCount}</p>
            </div>
            <p>
              {markedAsFavourited
                ? "Remove from favourites"
                : "Mark as favourite"}
            </p>
          </div>
        </Button>
      )}
      <TacticBoard readOnly play={post.play} />
    </div>
  );
};
