import styles from "./ProposalHistory.module.css";

interface ProposalHistoryProps {
  proposalId: string;
}

export const ProposalHistory = ({ proposalId }: ProposalHistoryProps) => {
  return <div className={styles.detailContainer}>Proposal History</div>;
};
