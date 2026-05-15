import { GetPostsByCriteriaRequestDTO } from "@/modules/post/infrastructure/dtos/GetPostByCriteriaRequestDTO";
import { PostMinCreationDate } from "@/types/PostSearching/PostMinCreationDate";

const getMinCreationDate = (value?: string) => {
  if (!value || value === PostMinCreationDate.LIFETIME) {
    return undefined;
  }

  const date = new Date();

  switch (value) {
    case PostMinCreationDate.LAST_2_DAYS:
      date.setDate(date.getDate() - 2);
      break;
    case PostMinCreationDate.LAST_WEEK:
      date.setDate(date.getDate() - 7);
      break;
    case PostMinCreationDate.LAST_MONTH:
      date.setMonth(date.getMonth() - 1);
      break;
    case PostMinCreationDate.LAST_3_MONTHS:
      date.setMonth(date.getMonth() - 3);
      break;
    case PostMinCreationDate.LAST_YEAR:
      date.setFullYear(date.getFullYear() - 1);
      break;
    default:
      return undefined;
  }

  return date.toISOString();
};

export const getPostsByCriteriaRequestMapper = (
  req: GetPostsByCriteriaRequestDTO,
): GetPostsByCriteriaRequestDTO => {
  return {
    ...req,
    minCreationDate: getMinCreationDate(req.minCreationDate),
  };
};
