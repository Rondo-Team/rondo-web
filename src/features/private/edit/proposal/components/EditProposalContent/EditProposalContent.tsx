"use client";

import { Button } from "@/components/Button/Button";
import { TacticBoard } from "@/components/TacticBoard";
import { TacticBoardHandle } from "@/components/TacticBoard/TacticBoard";
import { EditableTextField } from "@/components/TextField";
import { updateProposalAction } from "@/features/private/edit/proposal/components/EditProposalContent/actions/updateProposalAction";
import { Link } from "@/i18n/navigation";
import { ProposalDetail } from "@/modules/proposal/domain/value-objects/ProposalDetail";
import { CREATE_PROPOSAL_LIMITS } from "@/modules/shared/domain/consts";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { Play } from "@/types/Play";
import { useTranslations } from "next-intl";
import { useActionState, useRef, useState } from "react";
import styles from "./EditProposalContent.module.css";

interface EditProposalContentProps {
  proposal: ProposalDetail;
}

export const EditProposalContent = ({ proposal }: EditProposalContentProps) => {
  const t = useTranslations("editPage.proposal");
  const updateProposalWithId = updateProposalAction.bind(null, proposal.id);

  const [state, formAction, isPending] = useActionState(
    updateProposalWithId,
    {},
  );
  const tacticBoardRef = useRef<TacticBoardHandle>(null);
  const playInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(proposal.title);
  const [description, setDescription] = useState(proposal.description);

  const handleTitleChange = (value: string) => {
    setTitle(value);
  };

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  };

  const handlePlayChange = (play: Play) => {
    if (playInputRef.current) {
      playInputRef.current.value = JSON.stringify(play);
    }
  };

  return (
    <form action={formAction} className={styles.createFormContainer}>
      <p
        className={`${styles.errorText} ${
          !state.success && state.message
            ? styles.errorVisible
            : styles.errorHidden
        }`}
      >
        {state.message || " "}
      </p>

      <div className={styles.metadataFields}>
        <EditableTextField
          name="title"
          value={title}
          type="text"
          placeholder={t("title.placeholder")}
          onChange={handleTitleChange}
          error={state.errors?.title}
          maxLength={CREATE_PROPOSAL_LIMITS.title.max}
        />

        <EditableTextField
          name="description"
          value={description}
          type="textarea"
          placeholder={t("description.placeholder")}
          onChange={handleDescriptionChange}
          error={state.errors?.description}
          variant="subtitle"
          maxLength={CREATE_PROPOSAL_LIMITS.description.max}
        />
      </div>

      <p className={styles.originalPost}>
        {t.rich("proposingFor", {
          postTitle: proposal.post.title,
          originalPost: (chunks: React.ReactNode) => (
            <Link
              href={`${AppSectionsRoutes.POST}/${proposal.id}`}
              className={styles.originalPostLink}
            >
              {chunks}
            </Link>
          ),
        })}
      </p>

      <input name="title" type="hidden" value={title} readOnly />
      <input name="description" type="hidden" value={description} readOnly />
      <input ref={playInputRef} name="play" type="hidden" defaultValue="" />

      <div className={styles.playField}>
        <p className={styles.fieldErrorText}>{state.errors?.play || " "}</p>
        <TacticBoard
          ref={tacticBoardRef}
          onPlayChange={handlePlayChange}
          play={proposal.play}
        />
      </div>

      <div className={styles.submitButtons}>
        <Button type="submit" disabled={isPending}>
          {t("submit.save")}
        </Button>
        <Link href={`${AppSectionsRoutes.PROPOSAL}/${proposal.id}`}>
          <Button type="submit" variant="tertiary">
            {t("submit.cancel")}
          </Button>
        </Link>
      </div>
    </form>
  );
};
