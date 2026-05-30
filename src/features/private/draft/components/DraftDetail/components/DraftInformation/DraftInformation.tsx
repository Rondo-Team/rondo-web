"use client";

import { Button } from "@/components/Button/Button";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { TacticBoard } from "@/components/TacticBoard";
import { deleteDraft } from "@/features/private/draft/components/DraftDetail/components/DraftInformation/queries/deleteDraft";
import { DraftDetail } from "@/modules/draft/domain/value-objects/DraftDetail";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./DraftInformation.module.css";

interface DraftInformationProps {
  draft: DraftDetail;
}

export const DraftInformation = ({ draft }: DraftInformationProps) => {
  const t = useTranslations("draftPage.actions");

  const handleConfirmDelete = async () => {
    await deleteDraft(draft.id);
    redirect("/home");
  };

  return (
    <div className={styles.detailContainer}>
      <div className={styles.shortActions}>
        <h1 className={styles.draftTitle}>{draft.title}</h1>
        <div className={styles.actionsContainer}>
          <Button variant="secondary">
            <Link href={`/edit/draft/${draft.id}`}>{t("edit")}</Link>
          </Button>
          <DeleteConfirmation
            onConfirm={handleConfirmDelete}
            confirmationText={t("delete.confirmationText")}
          />
        </div>
      </div>
      <p className={styles.draftDescription}>{draft.description}</p>
      <TacticBoard readOnly play={draft.play} />
    </div>
  );
};
