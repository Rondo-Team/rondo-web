import { DraftDetail } from "@/features/private/draft/components/DraftDetail";

interface DraftProps {
  id: string;
}

export const Draft = ({ id }: DraftProps) => {
  return <DraftDetail id={id} />;
};
