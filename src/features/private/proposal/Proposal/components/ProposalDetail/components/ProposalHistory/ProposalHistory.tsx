import { ProposalHistoryContent } from "@/features/private/proposal/Proposal/components/ProposalDetail/components/ProposalHistory/components/ProposalHistoryContent";
import { getProposalHistoryEntries } from "@/features/private/proposal/Proposal/components/ProposalDetail/components/ProposalHistory/queries/getProposalHistoryEntries";
import { getTranslations } from "next-intl/server";
import styles from "./ProposalHistory.module.css";
interface ProposalHistoryProps {
  proposalId: string;
  userOwnsPost: boolean;
  userOwnsProposal: boolean;
}

export const ProposalHistory = async ({ proposalId, userOwnsPost, userOwnsProposal }: ProposalHistoryProps) => {
  const historyEntries = await getProposalHistoryEntries(proposalId);
  if (!historyEntries) return <div>could not fetch historic content</div>;
  const t = await getTranslations("proposalPage");
  const canReply = userOwnsPost || userOwnsProposal
  return (
    <div className={styles.historyContainer}>
      <h1>{t("title")}</h1>
      <ProposalHistoryContent
        historyEntries={historyEntries}
        proposalId={proposalId}
        canReply={canReply}
      />
    </div>
  );
};
