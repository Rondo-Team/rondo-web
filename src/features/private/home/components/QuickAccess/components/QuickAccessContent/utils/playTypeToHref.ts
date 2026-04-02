import { AppSectionsRoutes } from "@/types/AppSectionsRoutes";
import { RecentlyViewedItemTypes } from "@/types/RecentlyViewedItemsTypes";

export const playTypeToHref = (type: RecentlyViewedItemTypes) => {
  switch (type) {
    case RecentlyViewedItemTypes.POST:
      return AppSectionsRoutes.POST;
    case RecentlyViewedItemTypes.DRAFT:
      return AppSectionsRoutes.DRAFT;
    default:
      return null;
  }
};
