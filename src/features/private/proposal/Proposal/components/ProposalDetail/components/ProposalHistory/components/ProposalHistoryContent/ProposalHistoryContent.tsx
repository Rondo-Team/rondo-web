"use client";
import { Timeline, TimelineItem } from "@/components/Timeline";
import { replyProposal } from "@/features/private/proposal/Proposal/components/ProposalDetail/components/ProposalHistory/components/ProposalHistoryContent/queries/replyProposal";
import { ProposalHistoryEntrie } from "@/modules/proposal/domain/value-objects/ProposalHistoryEntrie";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import { HistoryEntrie } from "./components/HistoryEntrie";
import styles from "./ProposalHistoryContent.module.css";

interface ProposalHistoryContentProps {
  historyEntries: ProposalHistoryEntrie[];
  proposalId: string;
}

export const ProposalHistoryContent = ({
  historyEntries,
  proposalId,
}: ProposalHistoryContentProps) => {
  const t = useTranslations("proposalPage.history");
  const newMessageTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [newMessageText, setNewMessageText] = useState("");
  const router = useRouter();

  useLayoutEffect(() => {
    if (!newMessageTextareaRef.current) return;

    newMessageTextareaRef.current.style.height = "auto";
    newMessageTextareaRef.current.style.height = `${newMessageTextareaRef.current.scrollHeight}px`;
  }, [newMessageText]);

  const handleMessageSubmit = async () => {
    if (!newMessageText.trim()) return;

    console.log("new message:", newMessageText.trim());
    await replyProposal(proposalId, newMessageText);
    setNewMessageText("");
    router.refresh();
  };

  const handleMessageKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleMessageSubmit();
    }
  };

  return (
    <div className={styles.proposalHistoryContent}>
      <div className={styles.composer}>
        <textarea
          ref={newMessageTextareaRef}
          value={newMessageText}
          onChange={(event) => setNewMessageText(event.target.value)}
          onKeyDown={handleMessageKeyDown}
          placeholder={t("newMessage")}
          className={styles.textarea}
          rows={1}
        />
      </div>

      <Timeline>
        {historyEntries.map((entrie, index) => (
          <TimelineItem key={index}>
            <HistoryEntrie
              username={entrie.user.username}
              intent={entrie.intent}
              createdAt={entrie.createdAt}
              payload={entrie.payload}
            />
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};
