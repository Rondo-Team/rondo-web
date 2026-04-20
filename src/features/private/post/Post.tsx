import { PostDetail } from "@/features/private/post/components/PostDetail";

interface PostProps {
  id: string;
}

export const Post = ({ id }: PostProps) => {
  return <PostDetail id={id} />;
};
