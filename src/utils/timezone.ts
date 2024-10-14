import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Converts a given UTC date-time string to a specified WordPress timezone.
 *
 * @param utcDateTime - The UTC date-time string to be converted.
 * @param wpTimezone - The WordPress timezone to convert the date-time to.
 * @returns The formatted date-time string in the specified timezone.
 */
export const convertToTimezone = (utcDateTime: string, wpTimezone: string) => {
  const zonedDate = dayjs.utc(utcDateTime).tz(wpTimezone);
  const formattedDate = zonedDate.format("YYYY-MM-DD HH:mm");
  return formattedDate;
};
