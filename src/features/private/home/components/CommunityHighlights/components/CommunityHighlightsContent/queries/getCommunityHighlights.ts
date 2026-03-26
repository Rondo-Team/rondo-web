import { getCommunityHighlightsUseCase } from "@/modules/post/PostModule";

export const getCommunityHighlights = async () => {
  try {
    return await getCommunityHighlightsUseCase.run();
  } catch {
    return null;
  }
};
