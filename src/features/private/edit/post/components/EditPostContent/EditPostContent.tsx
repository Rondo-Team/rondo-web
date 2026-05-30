"use client";

import { Button } from "@/components/Button/Button";
import { TacticBoard } from "@/components/TacticBoard";
import { TacticBoardHandle } from "@/components/TacticBoard/TacticBoard";
import { EditableTextField } from "@/components/TextField";
import { PostDetail } from "@/modules/post/domain/value-object/PostDetail";
import { CREATE_PLAY_LIMITS } from "@/modules/shared/domain/consts";
import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { Play } from "@/types/Play";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useActionState, useRef, useState } from "react";
import { updatePostAction } from "./actions/updatePostAction";
import { TagsInput } from "./components/TagsInput/TagsInput";
import styles from "./EditPostContent.module.css";

interface EditPostContentProps {
  post: PostDetail;
}

export const EditPostContent = ({ post }: EditPostContentProps) => {
  const t = useTranslations("editPage.post");
  const updatePostWithId = updatePostAction.bind(null, post.id);

  const [state, formAction, isPending] = useActionState(updatePostWithId, {});
  const tacticBoardRef = useRef<TacticBoardHandle>(null);
  const playInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);

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
          play={post.play}
        />
      </div>

      <TagsInput name="tags" addButtonLabel={t("tagsInput.add")} defaultTags={post.tags}/>
      <div className={styles.submitButtons}>
        <Button type="submit" disabled={isPending}>
          {t("submit.save")}
        </Button>
        <Link href={`${AppSectionsRoutes.POST}/${post.id}`}>
          <Button type="submit" variant="tertiary">
            {t("submit.cancel")}
          </Button>
        </Link>
      </div>
    </form>
  );
};
