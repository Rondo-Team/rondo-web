"use client";

import { Button } from "@/components/Button/Button";
import { TacticBoard } from "@/components/TacticBoard";
import { TacticBoardHandle } from "@/components/TacticBoard/TacticBoard";
import { EditableTextField } from "@/components/TextField";
import { DraftDetail } from "@/modules/draft/domain/value-objects/DraftDetail";
import { CREATE_PLAY_LIMITS } from "@/modules/shared/domain/consts";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { Play } from "@/types/Play";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { updateDraftAction } from "./actions/updateDraftAction";
import styles from "./EditDraftContent.module.css";

interface EditDraftContentProps {
  draft: DraftDetail;
}

export const EditDraftContent = ({ draft }: EditDraftContentProps) => {
  const t = useTranslations("editPage.draft");
  const updateDraftWithId = updateDraftAction.bind(null, draft.id);

  const [state, formAction, isPending] = useActionState(updateDraftWithId, {});
  const tacticBoardRef = useRef<TacticBoardHandle>(null);
  const playInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(draft.title);
  const [description, setDescription] = useState(draft.description);

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
          maxLength={CREATE_PLAY_LIMITS.title.max}
        />

        <EditableTextField
          name="description"
          value={description}
          type="textarea"
          placeholder={t("description.placeholder")}
          onChange={handleDescriptionChange}
          error={state.errors?.description}
          variant="subtitle"
          maxLength={CREATE_PLAY_LIMITS.description.max}
        />
      </div>

      <input name="title" type="hidden" value={title} readOnly />
      <input name="description" type="hidden" value={description} readOnly />
      <input ref={playInputRef} name="play" type="hidden" defaultValue="" />

      <div className={styles.playField}>
        <p className={styles.fieldErrorText}>{state.errors?.play || " "}</p>
        <TacticBoard
          ref={tacticBoardRef}
          onPlayChange={handlePlayChange}
          play={draft.play}
        />
      </div>
      <div className={styles.submitButtons}>
        <Button type="submit" disabled={isPending}>
          {t("submit.save")}
        </Button>
        <Link href={`${AppSectionsRoutes.DRAFT}/${draft.id}`}>
          <Button type="submit" variant="tertiary">
            {t("submit.cancel")}
          </Button>
        </Link>
      </div>
    </form>
  );
};
