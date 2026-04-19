export const COMMUNITY_HIGHLIGHT_DEFAULT_PAGE = 1;
export const COMMUNITY_HIGHLIGHT_DEFAULT_LIMIT = 3;

export const CREATE_PLAY_LIMITS = {
  title: { min: 3, max: 30 },
  description: { min: 10, max: 500 },
} as const;
