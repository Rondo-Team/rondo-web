"use client";

import { ChevronDownIcon } from "@/components/Icons/ChevronDownIcon";
import { HeartIcon } from "@/components/Icons/HeartIcon";
import { UserProfile } from "@/components/UserProfile";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./Comment.module.css";

interface ReplySubmitParams {
  parentId: string;
  replyText: string;
}

interface CommentProps {
  id: string;
  name: string;
  username: string;
  content: string;
  favouritesCount: number;
  markedAsFavourited?: boolean;
  isUpdatingFavourite?: boolean;
  onFavouriteToggle?: () => void | Promise<void>;
  createdAt: string;
  repliesCount?: number;
  areRepliesExpanded?: boolean;
  onReplySubmit?: (params: ReplySubmitParams) => Promise<string | null> | void;
  onRepliesToggle?: () => void;
  className?: string;
}

export const Comment = ({
  id,
  name,
  username,
  content,
  favouritesCount,
  markedAsFavourited = false,
  isUpdatingFavourite = false,
  onFavouriteToggle,
  createdAt,
  repliesCount = 0,
  areRepliesExpanded = false,
  onReplySubmit,
  onRepliesToggle,
  className,
}: CommentProps) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const replyTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [showContentToggle, setShowContentToggle] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const checkOverflow = () => {
      setShowContentToggle(
        contentElement.scrollHeight > contentElement.clientHeight + 1,
      );
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [content, isContentExpanded]);

  useLayoutEffect(() => {
    if (!isReplying || !replyTextareaRef.current) return;

    replyTextareaRef.current.style.height = "auto";
    replyTextareaRef.current.style.height = `${replyTextareaRef.current.scrollHeight}px`;
  }, [isReplying, replyText]);

  useEffect(() => {
    if (isReplying) {
      replyTextareaRef.current?.focus();
    }
  }, [isReplying]);

  const handleReplyToggle = () => {
    setIsReplying((prev) => !prev);
  };

  const handleReplyCancel = () => {
    setReplyText("");
    setIsReplying(false);
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim() || isSubmittingReply) return;

    setIsSubmittingReply(true);
    try {
      await onReplySubmit?.({
        parentId: id,
        replyText: replyText.trim(),
      });
      setReplyText("");
      setIsReplying(false);
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const handleReplyKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Escape") {
      event.preventDefault();
      handleReplyCancel();
      return;
    }

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleReplySubmit();
    }
  };

  return (
    <div
      id={`comment-${id}`}
      data-comment-id={id}
      className={`${styles.commentContainer}${className ? ` ${className}` : ""}`}
    >
      <div className={styles.commentBasicInfo}>
        <UserProfile name={name} username={username} />
        <p className={styles.createdAt}>{createdAt}</p>
      </div>
      <div className={styles.commentContentWrapper}>
        <p
          ref={contentRef}
          className={`${styles.commentContent} ${
            !isContentExpanded ? styles.clampedContent : ""
          }`}
        >
          {content}
        </p>
        {showContentToggle || isContentExpanded ? (
          <button
            type="button"
            className={styles.inlineAction}
            onClick={() => setIsContentExpanded((prev) => !prev)}
          >
            {isContentExpanded ? "See less" : "See more"}
          </button>
        ) : null}
      </div>
      <div className={styles.commentFooter}>
        <div className={styles.commentActions}>
          <div className={styles.commentLikes}>
            <button
              type="button"
              className={`${styles.inlineAction} ${styles.likeAction}`}
              onClick={() => onFavouriteToggle?.()}
              disabled={isUpdatingFavourite}
            >
              <HeartIcon filled={markedAsFavourited} />
              <p>{favouritesCount}</p>
            </button>
          </div>
          <button
            type="button"
            className={styles.inlineAction}
            onClick={handleReplyToggle}
            disabled={isSubmittingReply}
          >
            Reply
          </button>
        </div>
        {repliesCount > 0 ? (
          <button
            type="button"
            className={styles.inlineAction}
            onClick={onRepliesToggle}
          >
            <span>
              {repliesCount} {repliesCount === 1 ? "reply" : "replies"}
            </span>
            <ChevronDownIcon expanded={areRepliesExpanded} />
          </button>
        ) : null}
      </div>
      {isReplying ? (
        <div className={styles.replyComposer}>
          <textarea
            ref={replyTextareaRef}
            value={replyText}
            onChange={(event) => setReplyText(event.target.value)}
            onKeyDown={handleReplyKeyDown}
            placeholder="Write your reply"
            className={styles.replyTextarea}
            rows={1}
            disabled={isSubmittingReply}
          />
        </div>
      ) : null}
    </div>
  );
};
