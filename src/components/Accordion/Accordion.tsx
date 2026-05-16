"use client";

import { TitleSubtitle } from "@/components/TitleSubtitle";
import { useState } from "react";
import { ChevronDownIcon } from "../Icons/ChevronDownIcon";
import styles from "./Accordion.module.css";

interface AccordionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Accordion = ({
  title,
  description,
  children,
  defaultOpen = false,
}: AccordionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.header}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        <div className={styles.headerText}>
          <TitleSubtitle title={title} subtitle={description} />
        </div>
        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {open && <div className={styles.content}>{children}</div>}
    </div>
  );
};
