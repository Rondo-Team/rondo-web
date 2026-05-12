import { PostComment } from "@/modules/post/domain/value-object/PostComment";

interface CommentTree {
  rootComments: PostComment[];
  childrenByParentId: Map<string, PostComment[]>;
}

export const buildCommentTree = (comments: PostComment[]): CommentTree => {
  const childrenByParentId = new Map<string, PostComment[]>();
  const rootComments: PostComment[] = [];

  for (const comment of comments) {
    if (!comment.parentId) {
      rootComments.push(comment);
      continue;
    }

    const existingChildren = childrenByParentId.get(comment.parentId) ?? [];
    existingChildren.push(comment);
    childrenByParentId.set(comment.parentId, existingChildren);
  }

  return { rootComments, childrenByParentId };
};
