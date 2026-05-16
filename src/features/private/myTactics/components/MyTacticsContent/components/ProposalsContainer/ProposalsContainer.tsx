import { ProposalMediumCard } from "@/components/ProposalMediumCard";
import { getUserProposals } from "@/features/private/myTactics/components/MyTacticsContent/components/ProposalsContainer/queries/getUserProposals";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import Link from "next/link";
import styles from "./ProposalsContainer.module.css";

export const ProposalsContainer = async () => {
  const proposals = await getUserProposals();
  if (!proposals) return <div>Could not fetch drafts</div>;
  if (proposals.length === 0) return <div>You dont have drafts yet</div>;
  return (
    <div className={styles.proposalsContainer}>
      {proposals.map((proposal) => (
        <Link
          href={`${AppSectionsRoutes.PROPOSAL}/${proposal.id}`}
          key={proposal.id}
        >
          <ProposalMediumCard
            title={proposal.title}
            basicInfo={proposal.postTitle}
            status={proposal.status}
          />
        </Link>
      ))}
    </div>
  );
};
