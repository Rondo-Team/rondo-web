import { ProposalDetail } from "@/features/private/proposal/Proposal/components/ProposalDetail";

interface ProposalProps {
  id: string;
}

export const Proposal = ({ id }: ProposalProps) => {
  return <ProposalDetail id={id} />;
};
