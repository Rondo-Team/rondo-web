import { getPostById } from "@/features/private/edit/post/queries/getPostById";
import { CreateProposalContent } from "@/features/private/proposal/CreateProposal/components/CreateProposalContent";
interface CreateProposalProps {
  postId: string;
}

export const CreateProposal = async ({ postId }: CreateProposalProps) => {
  const post = await getPostById(postId);
  if (!post) return <div>could not fetch post</div>;
  return <CreateProposalContent post={post} />;
};
