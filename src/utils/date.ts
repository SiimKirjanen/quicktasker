import dayjs from "dayjs";

function parseDate(dateString: string): Date {
  return new Date(dateString);
}

function formatDate(
  dateString: string,
  options?: Intl.DateTimeFormatOptions,
): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
}

/**
 * Calculates the difference between two dates and returns it in multiple time units
 *
 * @param dateString1 - First date string (format: "YYYY-MM-DD HH:MM:SS")
 * @param dateString2 - Second date string (format: "YYYY-MM-DD HH:MM:SS")
 * @returns Object with difference in milliseconds, seconds, minutes, hours and days
 */
function getDateDifference(
  dateString1: string,
  dateString2: string,
): {
  milliseconds: number;
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
} {
  const date1 = new Date(dateString1);
  const date2 = new Date(dateString2);

  // Calculate the difference in milliseconds
  const diffMs = date2.getTime() - date1.getTime();

  // Convert to other units
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  return {
    milliseconds: diffMs,
    seconds,
    minutes,
    hours,
    days,
  };
}

function getCurrentUTCDateTime(): string {
  return dayjs().utc().format("YYYY-MM-DD HH:mm:ss");
}

export { formatDate, getCurrentUTCDateTime, getDateDifference, parseDate };
