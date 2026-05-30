const SECOND_IN_MS = 1000;
const MINUTE_IN_SECONDS = 60;
const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;
const DAY_IN_SECONDS = 24 * HOUR_IN_SECONDS;
const WEEK_IN_SECONDS = 7 * DAY_IN_SECONDS;
const MONTH_IN_SECONDS = 30 * DAY_IN_SECONDS;
const YEAR_IN_SECONDS = 365 * DAY_IN_SECONDS;

type RelativeUnit = Intl.RelativeTimeFormatUnit;

const UNITS: Array<{ unit: RelativeUnit; seconds: number }> = [
  { unit: "year", seconds: YEAR_IN_SECONDS },
  { unit: "month", seconds: MONTH_IN_SECONDS },
  { unit: "week", seconds: WEEK_IN_SECONDS },
  { unit: "day", seconds: DAY_IN_SECONDS },
  { unit: "hour", seconds: HOUR_IN_SECONDS },
  { unit: "minute", seconds: MINUTE_IN_SECONDS },
  { unit: "second", seconds: 1 },
];

export const formatRelativeDate = (
  date: Date | string | number | null | undefined,
  locale: string,
) => {
  if (date === null || date === undefined) {
    return new Intl.RelativeTimeFormat(locale, {
      numeric: "auto",
    }).format(0, "second");
  }

  const parsedDate = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(parsedDate.getTime())) {
    return new Intl.RelativeTimeFormat(locale, {
      numeric: "auto",
    }).format(0, "second");
  }

  const now = new Date();
  const secondsDiff = (parsedDate.getTime() - now.getTime()) / SECOND_IN_MS;
  const formatter = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  });

  for (const { unit, seconds } of UNITS) {
    if (Math.abs(secondsDiff) >= seconds || unit === "second") {
      return formatter.format(Math.round(secondsDiff / seconds), unit);
    }
  }

  return formatter.format(0, "second");
};
