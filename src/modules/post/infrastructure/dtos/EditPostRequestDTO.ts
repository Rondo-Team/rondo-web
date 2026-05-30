import { Play } from "@/types/Play";

export type EditPostRequestDTO = {
  title?: string;
  description?: string;
  tags?: string[];
  play?: Play;
};
