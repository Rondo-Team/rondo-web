import { getDraftById } from "@/features/private/edit/draft/queries/getDraftById";
import { notFound } from "next/navigation";
import { EditDraftContent } from "./components/EditDraftContent";

interface EditDraftProps {
  id: string;
}

export const EditDraft = async ({ id }: EditDraftProps) => {
  const draft = await getDraftById(id);
  if (!draft) notFound();

  return <EditDraftContent draft={draft} />;
};
