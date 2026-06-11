import { CreateProposal } from "@/features/private/proposal/CreateProposal";

export default async function ProposePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CreateProposal postId={id} />;
}
