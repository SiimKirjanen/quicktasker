import { useContext } from "@wordpress/element";
import { AppContext } from "../providers/AppContextProvider";
import {
  convertToTimezone,
  convertUTCDatetimeToWPTimezone,
} from "../utils/timezone";

const useTimezone = () => {
  const {
    state: { timezone },
  } = useContext(AppContext);

  const convertToWPTimezone = (utcDateTime: string) => {
    return convertToTimezone(utcDateTime, timezone);
  };

  const convertUTCDateTimeToWPTimezone = (utcDateTime: string) => {
    return convertUTCDatetimeToWPTimezone(utcDateTime, timezone);
  };

  return { convertToWPTimezone, convertUTCDateTimeToWPTimezone };
};

export { useTimezone };
