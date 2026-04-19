import { EditIcon } from "@/components/Icons/EditIcon";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./EditableTextField.module.css";

interface EditableTextFieldProps {
  name: string;
  value: string;
  type?: "text" | "textarea";
  placeholder?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  variant?: "title" | "subtitle";
  maxLength?: number;
}

export const EditableTextField = ({
  name,
  value,
  type = "text",
  placeholder = "",
  defaultValue = "",
  onChange,
  error,
  variant = "title",
  maxLength,
}: EditableTextFieldProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value || defaultValue);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useLayoutEffect(() => {
    if (isEditing && inputRef.current) {
      const textarea = inputRef.current as HTMLTextAreaElement;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    }
  }, [isEditing, editValue, type]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      const input = inputRef.current;
      input.focus();

      const cursorPosition = input.value.length;
      input.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [isEditing]);

  const handleBlur = () => {
    onChange?.(editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleBlur();
      return;
    }

    if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div className={styles.editingContainer}>
        {error && <p className={styles.errorText}>{error}</p>}
        <div
          className={styles.editableContainer}
          onClick={() => setIsEditing(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setIsEditing(true);
            }
          }}
        >
          <div
            className={`${styles.displayText} ${
              variant === "title" ? styles.titleVariant : styles.subtitleVariant
            }`}
          >
            {editValue || (
              <span className={styles.placeholder}>{placeholder}</span>
            )}
          </div>
          <div className={styles.editIconContainer}>
            <EditIcon />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.editingContainer} ${styles.editingContainerFullWidth}`}
    >
      {error && <p className={styles.errorText}>{error}</p>}
      <textarea
        ref={inputRef as React.Ref<HTMLTextAreaElement>}
        name={name}
        rows={1}
        value={editValue}
        onChange={(e) => {
          const nextValue = maxLength
            ? e.target.value.slice(0, maxLength)
            : e.target.value;
          setEditValue(nextValue);
          onChange?.(nextValue);
        }}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        maxLength={maxLength}
        className={`${styles.editTextarea} ${
          variant === "title" ? styles.titleVariant : styles.subtitleVariant
        } ${error ? styles.editInputError : ""}`}
        placeholder={placeholder}
      />
    </div>
  );
};
