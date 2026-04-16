import { StatusPill } from "@/components/StatusPill";
import { ProposalStatus } from "@/types/ProposalStatus";
import styles from "./ProposalLargeCard.module.css";

interface ProposalLargeCardProps {
  title: string;
  postTitle: string;
  status: ProposalStatus;
  createdAt: string;
}

export const ProposalLargeCard = ({
  title,
  postTitle,
  status,
  createdAt,
}: ProposalLargeCardProps) => {
  return (
    <div className={styles.proposalLargeCardContainer}>
      <div className={styles.proposalLargeCardTitleSubtitle}>
        <h1 className={styles.proposalLargeCardTitle}>{title}</h1>
        <p className={styles.proposalLargeCardDescription}>{postTitle}</p>
      </div>
      <div className={styles.proposalLargeCardTitleMetrics}>
        <StatusPill
          text={status}
          type={status === ProposalStatus.OPEN ? "primary" : "secondary"}
        />
        <p className={styles.proposalLargeCardDate}>{createdAt}</p>
      </div>
    </div>
  );
};
