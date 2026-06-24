"use client";
import { ProposalHistoryEntrieIntent } from "@/types/ProposalHistoryEntrieIntent";
import { capitalizeText } from "@/utils/capitalizeText";
import { formatRelativeDate } from "@/utils/formatRelativeDate";
import { useLocale, useTranslations } from "next-intl";
import styles from "./HistoryEntrie.module.css";

interface HistoryEntrieProps {
  username: string;
  intent: ProposalHistoryEntrieIntent;
  createdAt: string;
  payload?: string;
}

const intentKeys: Record<ProposalHistoryEntrieIntent, string> = {
  [ProposalHistoryEntrieIntent.CREATE]: "createIntent",
  [ProposalHistoryEntrieIntent.EDIT]: "editIntent",
  [ProposalHistoryEntrieIntent.ACCEPT]: "acceptIntent",
  [ProposalHistoryEntrieIntent.DECLINE]: "declineIntent",
  [ProposalHistoryEntrieIntent.MESSAGE]: "messageIntent",
};

export const HistoryEntrie = ({
  username,
  intent,
  createdAt,
  payload,
}: HistoryEntrieProps) => {
  const t = useTranslations("proposalPage.history");
  const locale = useLocale();

  return (
    <p className={styles.historyEntrie}>
      <span className={styles.intentText}>
        {t.rich(intentKeys[intent], {
          username,
          message: payload ?? "",
          user: (chunks) => <span className={styles.username}>{chunks}</span>,
        })}
      </span>{" "}
      <span className={styles.timeAgo}>
        {capitalizeText(formatRelativeDate(new Date(createdAt), locale))}
      </span>
    </p>
  );
};
