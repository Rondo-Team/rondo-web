import { DraftInformation } from "@/features/private/draft/components/DraftDetail/components/DraftInformation/DraftInformation";
import { getDraftById } from "@/features/private/draft/components/DraftDetail/queries/getDraftById";
import { notFound } from "next/navigation";
import styles from "./DraftDetail.module.css";

interface DraftDetailPropos {
  id: string;
}

export const DraftDetail = async ({ id }: DraftDetailPropos) => {
  const draft = await getDraftById(id);
  if (!draft) return notFound();
  return (
    <div className={styles.draftDetailContainer}>
      <DraftInformation draft={draft} />
    </div>
  );
};
