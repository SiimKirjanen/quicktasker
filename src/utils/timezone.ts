import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Converts a given UTC date-time string to a specified WordPress timezone.
 *
 * @param utcDateTime - The date-time string in UTC format.
 * @param wpTimezone - The WordPress timezone to convert the date-time to.
 * @returns The formatted date-time string in the specified timezone, or the original UTC date-time string with "(UTC)" appended in case of an error.
 *
 * @throws Will log an error to the console if the conversion fails.
 */
export const convertToTimezone = (utcDateTime: string, wpTimezone: string) => {
  try {
    const zonedDate = dayjs.utc(utcDateTime).tz(wpTimezone);
    const formattedDate = zonedDate.format("MMMM D, YYYY HH:mm");

    return formattedDate;
  } catch (error) {
    console.error("Error: ", error);

    return utcDateTime + " (UTC)";
  }
};

/**
 * Converts a UTC datetime string to a WordPress timezone Date object.
 *
 * @param utcDateTime - The UTC datetime string to be converted.
 * @param wpTimezone - The WordPress timezone identifier.
 * @returns The converted Date object in the specified WordPress timezone.
 * @throws Will log an error to the console if the conversion fails. In this case, the original UTC date-time string will be returned as a Date object.
 */
export const convertUTCDatetimeToWPTimezone = (
  utcDateTime: string,
  wpTimezone: string,
): Date => {
  try {
    const zonedDate = dayjs.utc(utcDateTime).tz(wpTimezone).toDate();

    return zonedDate;
  } catch (error) {
    console.error("Error: ", error);

    return new Date(utcDateTime);
  }
};

/**
 * Checks whether a UTC date-time string is in the past.
 *
 * @param utcDateTime - The date-time string in UTC format.
 * @returns True if the given date-time is before the current time.
 */
export const isUTCDateInPast = (utcDateTime: string): boolean => {
  return dayjs.utc(utcDateTime).isBefore(dayjs.utc());
};

/**
 * Retrieves the user's browser timezone using the Intl API.
 *
 * @returns The IANA timezone string representing the user's browser timezone.
 */
export const getUserBrowserTimezone = (): string => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Gets the timezone abbreviation for a given timezone.
 *
 * @param timezone - The IANA timezone string (e.g., "America/New_York", "Europe/London").
 * @returns The timezone abbreviation (e.g., "EST", "GMT", "PST").
 */
export const getTimezoneAbbreviation = (timezone: string): string => {
  try {
    const date = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short",
    });

    const parts = formatter.formatToParts(date);
    const timeZonePart = parts.find((part) => part.type === "timeZoneName");

    return timeZonePart ? timeZonePart.value : "";
  } catch (error) {
    console.error("Error getting timezone abbreviation: ", error);
    return "";
  }
};

/**
 * Converts a UTC datetime string to a specified timezone and formats it.
 *
 * @param utcDateTime - The date-time string in UTC format.
 * @param timezone - The IANA timezone string to convert to.
 * @param format - Optional dayjs format string. Defaults to "MMMM D, YYYY HH:mm".
 * @returns The formatted date-time string in the specified timezone.
 */
export const convertUTCToTimezoneFormatted = (
  utcDateTime: string,
  timezone: string,
  format: string = "MMMM D, YYYY HH:mm",
): string => {
  try {
    return dayjs.utc(utcDateTime).tz(timezone).format(format);
  } catch (error) {
    console.error("Error converting and formatting datetime: ", error);
    return utcDateTime + " (UTC)";
  }
};
