import { Proposal } from "@/features/private/proposal/Proposal";

export default async function ProposalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <Proposal id={id} />;
}
