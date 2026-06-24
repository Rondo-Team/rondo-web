import { ProposalHistoryEntrie } from "@/modules/proposal/domain/value-objects/ProposalHistoryEntrie";
import { GetProposalHistoryEntriesResponseDTO } from "@/modules/proposal/infrastructure/dtos/GetProposalHistoryEntriesResponseDTO";
import { ProposalHistoryEntrieIntent } from "@/types/ProposalHistoryEntrieIntent";

export const getProposalHistoryEntriesMapper = (
  dto: GetProposalHistoryEntriesResponseDTO,
): ProposalHistoryEntrie[] => {
  return dto.map((entrie) => ({
    user: {
      id: entrie.user.id,
      name: entrie.user.name,
      username: entrie.user.username,
      profilePicture: entrie.user.profilePicture,
    },
    createdAt: entrie.createdAt,
    intent: entrie.intent as ProposalHistoryEntrieIntent,
    payload: entrie.payload,
  }));
};
