import { Play } from "@/types/Play";

export type EditDraftRequestDTO = {
  title?: string;
  description?: string;
  play?: Play;
};
