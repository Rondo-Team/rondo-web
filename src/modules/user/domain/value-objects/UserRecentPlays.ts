import { RecentlyViewedItemTypes } from "@/types/RecentlyViewedItemsTypes";

export interface UserRecentPlays {
  recentlyViewedItems: {
    id: string;
    type: RecentlyViewedItemTypes;
  }[];
}
