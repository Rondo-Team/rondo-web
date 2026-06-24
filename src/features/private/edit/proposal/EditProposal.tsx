import { EditProposalContent } from "@/features/private/edit/proposal/components/EditProposalContent/EditProposalContent";
import { getProposalById } from "@/features/private/edit/proposal/queries/getProposalById";
interface EditProposalProps {
  proposalId: string;
}

export const EditProposal = async ({ proposalId }: EditProposalProps) => {
  const proposal = await getProposalById(proposalId);
  if (!proposal) return <div>could not fetch proposal</div>;
  return <EditProposalContent proposal={proposal} />;
};
