"use client";

import { Comment } from "@/components/Comment";
import { PostComment } from "@/modules/post/domain/value-object/PostComment";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./CommentsContainer.module.css";
import { buildCommentTree } from "./utils/buildCommentTree";

interface ReplySubmitParams {
  parentId: string;
  replyText: string;
}

interface CommentsContainerProps {
  comments: PostComment[];
  onReplySubmit?: (params: ReplySubmitParams) => Promise<string | null>;
  onCommentSubmit?: (message: string) => Promise<string | null>;
  onLikeCommentSubmit?: (commentId: string) => Promise<string | null>;
  onUnLikeCommentSubmit?: (favouriteId: string) => Promise<true | null>;
  commentFavouriteIdByCommentId?: Record<string, string>;
}

interface CommentThreadItemProps {
  comment: PostComment;
  childrenByParentId: Map<string, PostComment[]>;
  depth: number;
  onReplySubmit?: (params: ReplySubmitParams) => Promise<string | null>;
  onLikeCommentSubmit?: (commentId: string) => Promise<string | null>;
  onUnLikeCommentSubmit?: (favouriteId: string) => Promise<true | null>;
  commentFavouriteIdByCommentId?: Record<string, string>;
}

const MAX_VISUAL_REPLY_DEPTH = 1;

const CommentThreadItem = ({
  comment,
  childrenByParentId,
  depth,
  onReplySubmit,
  onLikeCommentSubmit,
  onUnLikeCommentSubmit,
  commentFavouriteIdByCommentId,
}: CommentThreadItemProps) => {
  const replies = childrenByParentId.get(comment.id) ?? [];
  const [areRepliesExpanded, setAreRepliesExpanded] = useState(false);
  const [isUpdatingFavourite, setIsUpdatingFavourite] = useState(false);
  const [favouritesCount, setFavouritesCount] = useState(
    comment.favouritesCount,
  );
  const [favouriteId, setFavouriteId] = useState<string | null>(
    commentFavouriteIdByCommentId?.[comment.id] ?? null,
  );
  const [markedAsFavourited, setMarkedAsFavourited] = useState(
    Boolean(commentFavouriteIdByCommentId?.[comment.id]),
  );
  const visualDepth = Math.min(depth, MAX_VISUAL_REPLY_DEPTH);

  useEffect(() => {
    const initialFavouriteId =
      commentFavouriteIdByCommentId?.[comment.id] ?? null;
    setFavouritesCount(comment.favouritesCount);
    setFavouriteId(initialFavouriteId);
    setMarkedAsFavourited(Boolean(initialFavouriteId));
    setIsUpdatingFavourite(false);
  }, [comment, commentFavouriteIdByCommentId]);

  const handleReplySubmit = async (params: ReplySubmitParams) => {
    if (!onReplySubmit) return null;
    const createdReplyId = await onReplySubmit(params);
    if (createdReplyId) {
      setAreRepliesExpanded(true);
    }
    return createdReplyId;
  };

  const visualDepthClassName = `${
    visualDepth > 0 ? styles.replyIndented : ""
  } ${visualDepth === 1 ? styles.replyComment : ""}`.trim();

  const handleFavouriteToggle = async () => {
    if (isUpdatingFavourite) return;

    setIsUpdatingFavourite(true);

    try {
      if (markedAsFavourited) {
        if (!favouriteId || !onUnLikeCommentSubmit) return;

        const result = await onUnLikeCommentSubmit(favouriteId);
        if (!result) return;

        setMarkedAsFavourited(false);
        setFavouriteId(null);
        setFavouritesCount((prev) => Math.max(0, prev - 1));
        return;
      }

      if (!onLikeCommentSubmit) return;

      const createdFavouriteId = await onLikeCommentSubmit(comment.id);
      if (!createdFavouriteId) return;

      setMarkedAsFavourited(true);
      setFavouriteId(createdFavouriteId);
      setFavouritesCount((prev) => prev + 1);
    } finally {
      setIsUpdatingFavourite(false);
    }
  };

  return (
    <div>
      <Comment
        id={comment.id}
        name={comment.user.name}
        username={comment.user.username}
        content={comment.message}
        favouritesCount={favouritesCount}
        markedAsFavourited={markedAsFavourited}
        isUpdatingFavourite={isUpdatingFavourite}
        onFavouriteToggle={handleFavouriteToggle}
        createdAt={comment.createdAt}
        repliesCount={replies.length}
        areRepliesExpanded={areRepliesExpanded}
        onReplySubmit={handleReplySubmit}
        onRepliesToggle={() => {
          if (replies.length === 0) return;
          setAreRepliesExpanded((prev) => !prev);
        }}
        className={visualDepthClassName}
      />
      {areRepliesExpanded && replies.length > 0 ? (
        <div className={styles.repliesContainer}>
          {replies.map((reply) => (
            <CommentThreadItem
              key={reply.id}
              comment={reply}
              childrenByParentId={childrenByParentId}
              depth={depth + 1}
              onReplySubmit={onReplySubmit}
              onLikeCommentSubmit={onLikeCommentSubmit}
              onUnLikeCommentSubmit={onUnLikeCommentSubmit}
              commentFavouriteIdByCommentId={commentFavouriteIdByCommentId}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export const CommentsContainer = ({
  comments,
  onReplySubmit,
  onCommentSubmit,
  onLikeCommentSubmit,
  onUnLikeCommentSubmit,
  commentFavouriteIdByCommentId,
}: CommentsContainerProps) => {
  const t = useTranslations("postPage.comments");
  const router = useRouter();
  const newCommentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [newCommentText, setNewCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [pendingScrollCommentId, setPendingScrollCommentId] = useState<
    string | null
  >(null);

  const { rootComments, childrenByParentId } = useMemo(
    () => buildCommentTree(comments),
    [comments],
  );

  useLayoutEffect(() => {
    if (!newCommentTextareaRef.current) return;

    newCommentTextareaRef.current.style.height = "auto";
    newCommentTextareaRef.current.style.height = `${newCommentTextareaRef.current.scrollHeight}px`;
  }, [newCommentText]);

  useEffect(() => {
    if (!pendingScrollCommentId) return;

    const target = document.querySelector<HTMLElement>(
      `[data-comment-id="${pendingScrollCommentId}"]`,
    );

    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "center" });
    setPendingScrollCommentId(null);
  }, [comments, pendingScrollCommentId]);

  const handleCommentSubmit = async () => {
    if (!onCommentSubmit || !newCommentText.trim() || isSubmittingComment) {
      return;
    }

    setIsSubmittingComment(true);
    try {
      const createdCommentId = await onCommentSubmit(newCommentText.trim());
      setNewCommentText("");
      if (createdCommentId) {
        setPendingScrollCommentId(createdCommentId);
      }
      router.refresh();
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleReplySubmit = async (params: ReplySubmitParams) => {
    if (!onReplySubmit) return null;

    const createdReplyId = await onReplySubmit(params);
    if (createdReplyId) {
      setPendingScrollCommentId(createdReplyId);
      router.refresh();
    }

    return createdReplyId;
  };

  const handleCommentKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleCommentSubmit();
    }
  };

  return (
    <div className={styles.commentsContainer}>
      <div className={styles.commentComposer}>
        <textarea
          ref={newCommentTextareaRef}
          value={newCommentText}
          onChange={(event) => setNewCommentText(event.target.value)}
          onKeyDown={handleCommentKeyDown}
          placeholder={t("newComment")}
          className={styles.commentTextarea}
          rows={1}
          disabled={isSubmittingComment}
        />
      </div>

      {rootComments.length === 0 ? (
        <div>No comments yet.</div>
      ) : (
        <div className={styles.rootCommentsContainer}>
          {rootComments.map((comment) => (
            <CommentThreadItem
              key={comment.id}
              comment={comment}
              childrenByParentId={childrenByParentId}
              depth={0}
              onReplySubmit={handleReplySubmit}
              onLikeCommentSubmit={onLikeCommentSubmit}
              onUnLikeCommentSubmit={onUnLikeCommentSubmit}
              commentFavouriteIdByCommentId={commentFavouriteIdByCommentId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
