import { ProposalLargeCard } from "@/components/ProposalLargeCard";
import { getAllProposalsByPostId } from "@/features/private/post/components/PostDetail/components/PostProposals/queries/getAllProposalsByPostId";
import { capitalizeText } from "@/utils/capitalizeText";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { getLocale } from "next-intl/server";
import styles from "./PostProposals.module.css";

interface PostProposalsProps {
  postId: string;
}

export const PostProposals = async ({ postId }: PostProposalsProps) => {
  const locale = await getLocale();
  const proposals = await getAllProposalsByPostId(postId);

  if (!proposals) return <div>Could not fetch proposals </div>;
  if (proposals.length === 0) return <div>No proposals yet</div>;

  return (
    <div className={styles.proposalsContainer}>
      {proposals.map((proposal) => {
        const formattedDate = capitalizeText(
          formatRelativeDate(proposal.createdAt, locale),
        );
        return (
          <ProposalLargeCard
            createdAt={formattedDate}
            basicInfo={proposal.username}
            status={proposal.status}
            title={proposal.title}
            key={proposal.id}
          />
        );
      })}
    </div>
  );
};
