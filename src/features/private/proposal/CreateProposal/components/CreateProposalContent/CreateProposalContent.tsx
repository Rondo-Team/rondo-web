"use client";

import { Button } from "@/components/Button/Button";
import { TacticBoard } from "@/components/TacticBoard";
import { TacticBoardHandle } from "@/components/TacticBoard/TacticBoard";
import { EditableTextField } from "@/components/TextField";
import { createProposalAction } from "@/features/private/proposal/CreateProposal/components/CreateProposalContent/actions/createProposalAction";
import { PostDetail } from "@/modules/post/domain/value-object/PostDetail";
import { CREATE_PROPOSAL_LIMITS } from "@/modules/shared/domain/consts";
import { Play } from "@/types/Play";
import { useTranslations } from "next-intl";
import { useActionState, useRef, useState } from "react";
import styles from "./CreateProposalContent.module.css";

interface CreateProposalContentProps {
  post: PostDetail;
}

export const CreateProposalContent = ({ post }: CreateProposalContentProps) => {
  const t = useTranslations("createProposal.createForm");
  const createProposalWithPostId = createProposalAction.bind(null, post.id);

  const [state, formAction, isPending] = useActionState(
    createProposalWithPostId,
    {},
  );
  const tacticBoardRef = useRef<TacticBoardHandle>(null);
  const playInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
        {t("proposingFor", {
          originalPost: post.title,
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
          play={post.play}
        />
      </div>

      <div className={styles.submitButtons}>
        <Button type="submit" disabled={isPending}>
          {t("submit.proposal")}
        </Button>
      </div>
    </form>
  );
};
