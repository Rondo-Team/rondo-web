import { RecentlyViewedItemTypes } from "@/types/RecentlyViewedItemsTypes";

export type UserRecentPlays = {
  id: string;
  type: RecentlyViewedItemTypes;
}[];
