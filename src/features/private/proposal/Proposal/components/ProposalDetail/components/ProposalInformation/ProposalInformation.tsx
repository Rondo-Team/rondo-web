"use client";

import { Button } from "@/components/Button";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { StatusPill } from "@/components/StatusPill";
import { TacticBoard } from "@/components/TacticBoard";
import { UserProfile } from "@/components/UserProfile";
import { acceptProposal } from "@/features/private/proposal/Proposal/components/ProposalDetail/components/ProposalInformation/queries/acceptProposal";
import { declineProposal } from "@/features/private/proposal/Proposal/components/ProposalDetail/components/ProposalInformation/queries/declineProposal";
import { deleteProposalById } from "@/features/private/proposal/Proposal/components/ProposalDetail/components/ProposalInformation/queries/deleteProposalById";
import { ProposalDetail } from "@/modules/proposal/domain/value-objects/ProposalDetail";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { ProposalStatus } from "@/types/ProposalStatus";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import styles from "./ProposalInformation.module.css";

interface ProposalInformationProps {
  proposal: ProposalDetail;
  userOwnsPost: boolean;
  userOwnsProposal: boolean;
}

export const ProposalInformation = ({
  proposal,
  userOwnsPost,
  userOwnsProposal,
}: ProposalInformationProps) => {
  const t = useTranslations("proposalPage");
  const router = useRouter();

  const handleAcceptChanges = async () => {
    await acceptProposal(proposal.id);
    redirect(`${AppSectionsRoutes.POST}/${proposal.post.id}`);
  };

  const handleDeclineChanges = async () => {
    await declineProposal(proposal.id);
    router.refresh();
  };

  const handleDeleteProposal = async () => {
    await deleteProposalById(proposal.id);
    redirect(AppSectionsRoutes.HOME);
  };

  const canAcceptOrDecline =
    userOwnsPost && proposal.status === ProposalStatus.OPEN;

  return (
    <div className={styles.detailContainer}>
      <div>
        <StatusPill
          text={proposal.status}
          type={
            proposal.status === ProposalStatus.OPEN ? "primary" : "secondary"
          }
          size="big"
        />
      </div>
      <div className={styles.shortActions}>
        <h1 className={styles.proposalTitle}>{proposal.title}</h1>
        <div className={styles.actionsContainer}>
          {canAcceptOrDecline && (
            <>
              <Button variant="primary" onClick={handleAcceptChanges}>
                <div className={styles.buttonContent}>
                  {t("actions.acceptChanges")}
                </div>
              </Button>
              <Button variant="tertiary" onClick={handleDeclineChanges}>
                <div className={styles.buttonContent}>
                  {t("actions.declineChanges")}
                </div>
              </Button>
            </>
          )}
          {userOwnsProposal && (
            <>
              {proposal.status !== ProposalStatus.CLOSED && (
                <Button variant="secondary">
                  <Link href={`/edit/proposal/${proposal.id}`}>
                    {t("actions.edit")}
                  </Link>
                </Button>
              )}
              <DeleteConfirmation
                onConfirm={handleDeleteProposal}
                confirmationText={t("actions.delete.confirmationText")}
              />
            </>
          )}
        </div>
      </div>
      <p className={styles.proposalDescription}>{proposal.description}</p>
      <p className={styles.originalPost}>
        {t.rich("proposedFor", {
          postTitle: proposal.post.title,
          originalPost: (chunks: React.ReactNode) => (
            <Link
              href={`${AppSectionsRoutes.POST}/${proposal.post.id}`}
              className={styles.originalPostLink}
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
      <UserProfile
        name={proposal.user.name}
        username={proposal.user.username}
      />
      <TacticBoard readOnly play={proposal.play} />
    </div>
  );
};
