import { EditProposal } from "@/features/private/edit/proposal/EditProposal";

export default async function EditProposalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditProposal proposalId={id} />;
}
