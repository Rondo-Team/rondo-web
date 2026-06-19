import { getPostById } from "@/features/private/edit/post/queries/getPostById";
import { PostComments } from "@/features/private/post/components/PostDetail/components/PostComments";
import { ProposalInformation } from "@/features/private/proposal/Proposal/components/ProposalDetail/components";
import { getProposalById } from "@/features/private/proposal/Proposal/components/ProposalDetail/queries/getProposalById";
import { getUserIdFromCookie } from "@/utils/getUserIdFromCookie";
import { getTranslations } from "next-intl/server";
import styles from "./ProposalDetail.module.css";

interface ProposalDetailPropos {
  id: string;
}

export const ProposalDetail = async ({ id }: ProposalDetailPropos) => {
  const t = await getTranslations("postPage");
  const proposal = await getProposalById(id);
  if (!proposal) return <div>could not fetch post</div>;

  const post = await getPostById(proposal.post.id);

  console.log("POST", post)
  console.log("PROPOSAL", proposal)

  const userId = await getUserIdFromCookie();
  const userOwnsPost = post?.user.id === userId;
  const userOwnsProposal = proposal.user.id === userId;

  return (
    <div className={styles.postDetailContainer}>
      <ProposalInformation
        proposal={proposal}
        userOwnsPost={userOwnsPost}
        userOwnsProposal={userOwnsProposal}
      />
      {/*Proposal History*/ }
      <div className={styles.postComments}>
        <h1>{`${t("comments.title")}`}</h1>
        {/* <PostComments postId={proposal.id} /> */}
      </div>
    </div>
  );
};
