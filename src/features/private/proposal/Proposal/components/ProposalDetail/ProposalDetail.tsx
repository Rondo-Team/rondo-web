import { getPostById } from "@/features/private/edit/post/queries/getPostById";
import { ProposalHistory } from "@/features/private/proposal/Proposal/components/ProposalDetail/components/ProposalHistory";
import { ProposalInformation } from "@/features/private/proposal/Proposal/components/ProposalDetail/components/ProposalInformation";
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

  console.log("POST", post);
  console.log("PROPOSAL", proposal);

  const userId = await getUserIdFromCookie();
  const userOwnsPost = post?.user.id === userId;
  const userOwnsProposal = proposal.user.id === userId;

  return (
    <div className={styles.proposalDetailContainer}>
      <ProposalInformation
        proposal={proposal}
        userOwnsPost={userOwnsPost}
        userOwnsProposal={userOwnsProposal}
      />
      <ProposalHistory proposalId={proposal.id} />
    </div>
  );
};
