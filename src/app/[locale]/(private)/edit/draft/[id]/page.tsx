import { EditDraft } from "@/features/private/edit/draft";

export default async function EditDraftPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditDraft id={id} />;
}
