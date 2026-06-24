import { Play } from "@/types/Play";

export type EditProposalRequestDTO = {
  title?: string;
  description?: string;
  play?: Play;
};
