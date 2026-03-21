import { useContext, useMemo } from "@wordpress/element";
import { AppContext } from "../providers/AppContextProvider";
import {
  convertToTimezone,
  convertUTCDatetimeToWPTimezone,
  convertUTCToTimezoneFormatted,
  getTimezoneAbbreviation,
  getUserBrowserTimezone,
} from "../utils/timezone";

const useTimezone = () => {
  const {
    state: { timezone },
  } = useContext(AppContext);
  const browserTimezone = useMemo(() => getUserBrowserTimezone(), []);
  const browserTimezoneAbbreviation = useMemo(
    () => getTimezoneAbbreviation(browserTimezone),
    [browserTimezone],
  );

  const convertToWPTimezone = (utcDateTime: string) => {
    return convertToTimezone(utcDateTime, timezone);
  };

  const convertUTCDateTimeToWPTimezone = (utcDateTime: string) => {
    return convertUTCDatetimeToWPTimezone(utcDateTime, timezone);
  };

  const convertToBrowserTimezone = (utcDateTime: string, format?: string) => {
    return convertUTCToTimezoneFormatted(utcDateTime, browserTimezone, format);
  };

  return {
    convertToWPTimezone,
    convertUTCDateTimeToWPTimezone,
    convertToBrowserTimezone,
    browserTimezone,
    browserTimezoneAbbreviation,
  };
};

export { useTimezone };
