export type GetProposalHistoryEntriesResponseDTO = {
  user: {
    id: string;
    name: string;
    username: string;
    profilePicture: string;
  };
  createdAt: string;
  intent: string;
  payload?: string;
}[];
