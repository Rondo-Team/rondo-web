import { StatusPill } from "@/components/StatusPill";
import { ProposalStatus } from "@/types/ProposalStatus";
import styles from "./ProposalMediumCard.module.css";

interface ProposalMediumCardProps {
  title: string;
  basicInfo: string;
  status: ProposalStatus;
}

export const ProposalMediumCard = ({
  title,
  basicInfo,
  status,
}: ProposalMediumCardProps) => {
  return (
    <div className={styles.proposalLargeCardContainer}>
      <div className={styles.proposalLargeCardTitleSubtitle}>
        <h1 className={styles.proposalLargeCardTitle}>{title}</h1>
        <p className={styles.proposalLargeCardDescription}>{basicInfo}</p>
      </div>
      <div className={styles.proposalLargeCardTitleMetrics}>
        <StatusPill
          text={status}
          type={status === ProposalStatus.OPEN ? "primary" : "secondary"}
        />
      </div>
    </div>
  );
};
