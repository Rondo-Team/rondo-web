"use client";

import { Button } from "@/components/Button/Button";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import styles from "./DeleteConfirmation.module.css";

interface DeleteConfirmationProps {
  onConfirm: () => void;
  disabled?: boolean;
  confirmationText: string;
}

export const DeleteConfirmation = ({
  onConfirm,
  disabled = false,
  confirmationText,
}: DeleteConfirmationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const t = useTranslations("postPage.actions.delete");

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <div className={styles.wrapper} ref={containerRef}>
      <Button variant="tertiary" onClick={handleToggle} disabled={disabled}>
        {t("deleteLabel")}
      </Button>
      {isOpen && (
        <div className={styles.menu}>
          <p className={styles.confirmationText}>{confirmationText}</p>
          <div className={styles.actions}>
            <Button variant="secondary" onClick={handleCancel}>
              {t("cancelLabel")}
            </Button>
            <Button variant="tertiary" onClick={handleConfirm}>
              {t("confirmLabel")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
