export const PostMinCreationDate = {
  LIFETIME: "lifetime",
  LAST_2_DAYS: "last2Days",
  LAST_WEEK: "lastWeek",
  LAST_MONTH: "lastMonth",
  LAST_3_MONTHS: "last3Mmonths",
  LAST_YEAR: "lastYear",
} as const;

export type PostMinCreationDate =
  (typeof PostMinCreationDate)[keyof typeof PostMinCreationDate];
