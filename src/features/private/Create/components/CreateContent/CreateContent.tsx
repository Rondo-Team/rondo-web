"use client";

import { Button } from "@/components/Button/Button";
import { TacticBoard } from "@/components/TacticBoard";
import { TacticBoardHandle } from "@/components/TacticBoard/TacticBoard";
import { EditableTextField } from "@/components/TextField";
import { CREATE_PLAY_LIMITS } from "@/modules/shared/domain/consts";
import { Play } from "@/types/Play";
import { useTranslations } from "next-intl";
import { useActionState, useRef, useState } from "react";
import { createPlayAction } from "./actions/createPlayAction";
import { TagsInput } from "./components/TagsInput/TagsInput";
import styles from "./CreateContent.module.css";

export const CreateContent = () => {
  const t = useTranslations("createPage.createForm");

  const [state, formAction, isPending] = useActionState(createPlayAction, {});
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
        <TacticBoard ref={tacticBoardRef} onPlayChange={handlePlayChange} />
      </div>

      <TagsInput name="tags" />
      <div className={styles.submitButtons}>
        <input name="intent" type="hidden" readOnly />
        <Button type="submit" name="intent" value="post" disabled={isPending}>
          {t("submit.post")}
        </Button>
        <Button
          type="submit"
          name="intent"
          value="draft"
          disabled={isPending}
          variant="secondary"
        >
          {t("submit.draft")}
        </Button>
      </div>
    </form>
  );
};
