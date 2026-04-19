import { CloseIcon } from "@/components/Icons/CloseIcon";
import { PlusIcon } from "@/components/Icons/PlusIcon";
import { Tag } from "@/components/Tag";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./TagsInput.module.css";

interface TagsInputProps {
  name: string;
}

export const TagsInput = ({ name }: TagsInputProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagValue, setNewTagValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!isAddingTag || !inputRef.current || !measureRef.current) {
      return;
    }

    measureRef.current.textContent = newTagValue || "n";
    const measuredWidth = Math.ceil(
      measureRef.current.getBoundingClientRect().width,
    );
    inputRef.current.style.width = `${measuredWidth}px`;
  }, [isAddingTag, newTagValue]);

  const handleStartAddingTag = () => {
    setIsAddingTag(true);
    setNewTagValue("");
  };

  const handleNewTagChange = (value: string) => {
    // Tags cannot contain spaces and are stored normalized.
    const sanitizedValue = value.replace(/\s+/g, "").toLowerCase();
    setNewTagValue(sanitizedValue);
  };

  const handleCancelNewTag = () => {
    setNewTagValue("");
    setIsAddingTag(false);
  };

  const handleSaveNewTag = () => {
    const sanitizedTag = newTagValue.replace(/\s+/g, "").toLowerCase().trim();

    if (!sanitizedTag) {
      handleCancelNewTag();
      return;
    }

    if (tags.includes(sanitizedTag)) {
      handleCancelNewTag();
      return;
    }

    setTags((prevTags) => [sanitizedTag, ...prevTags]);
    handleCancelNewTag();
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className={styles.tagsSection}>
      <div className={styles.tagsList}>
        {isAddingTag && (
          <>
            <input
              ref={inputRef}
              type="text"
              value={newTagValue}
              onChange={(e) => handleNewTagChange(e.target.value)}
              onBlur={handleSaveNewTag}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSaveNewTag();
                }

                if (e.key === "Escape") {
                  handleCancelNewTag();
                }
              }}
              autoFocus
              className={styles.editableTagInput}
            />
            <span ref={measureRef} className={styles.hiddenMeasure} />
          </>
        )}

        {tags.map((tag) => (
          <div key={tag} className={styles.tagWithRemove}>
            <Tag text={tag} />
            <button
              type="button"
              onClick={() => handleRemoveTag(tag)}
              className={styles.removeButton}
              aria-label={`Eliminar tag ${tag}`}
            >
              <CloseIcon />
            </button>
          </div>
        ))}

        <button
          type="button"
          className={styles.addTagButton}
          onClick={handleStartAddingTag}
          disabled={isAddingTag}
        >
          Add Tag <PlusIcon />
        </button>
      </div>

      <input type="hidden" name={name} value={tags.join(",")} />
    </div>
  );
};
