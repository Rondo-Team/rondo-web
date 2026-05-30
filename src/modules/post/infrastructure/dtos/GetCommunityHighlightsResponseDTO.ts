export type GetCommunityHighlightsResponseDTO = {
  items: {
    id: string;
    title: string;
    description: string;
    favouritesCount: number;
    commentsCount: number;
    proposalsCount: number;
    createdAt: string;
    user: {
      username: string;
      name: string;
      profilePicture: string;
    };
  }[];
  limit: number;
  page: number;
  total: number;
};
