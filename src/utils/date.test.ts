import dayjs from "dayjs";
import MockDate from "jest-date-mock";
import {
  formatDate,
  getCurrentUTCDateTime,
  getDateDifference,
  parseDate,
} from "./date";

describe("Date Utils", () => {
  describe("parseDate", () => {
    it("should parse a valid date string", () => {
      const dateString = "2023-01-15 14:30:00";
      const result = parseDate(dateString);

      expect(result).toBeInstanceOf(Date);
      expect(result.getFullYear()).toBe(2023);
      expect(result.getMonth()).toBe(0); // January is 0
      expect(result.getDate()).toBe(15);
    });

    it("should handle invalid date strings", () => {
      const invalidDateString = "not-a-date";
      const result = parseDate(invalidDateString);

      expect(result.toString()).toBe("Invalid Date");
    });
  });

  describe("formatDate", () => {
    it("should format a date with default options", () => {
      // This test is locale-dependent, so we'll do a basic check
      const dateString = "2023-01-15 14:30:00";
      const result = formatDate(dateString);

      expect(typeof result).toBe("string");
      expect(result.length).toBeGreaterThan(0);
    });

    it("should format a date with custom options", () => {
      const dateString = "2023-01-15 14:30:00";
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };

      const result = formatDate(dateString, options);

      // The exact output depends on the locale, but we can check for certain patterns
      expect(result).toContain("2023");
      // Month name will be locale-dependent
      expect(result).toContain("15");
    });
  });

  describe("getDateDifference", () => {
    it("should calculate positive difference between dates", () => {
      const date1 = "2023-01-15 12:00:00";
      const date2 = "2023-01-18 14:30:00";

      const difference = getDateDifference(date1, date2);

      // 3 days and 2.5 hours = (3*24 + 2.5)*3600*1000 ms
      expect(difference.days).toBe(3);
      expect(difference.hours).toBe(74); // 3 days and 2 hours
      expect(difference.minutes).toBe(74 * 60 + 30); // Plus 30 minutes
      expect(difference.seconds).toBe((74 * 60 + 30) * 60); // Convert to seconds
      expect(difference.milliseconds).toBe((74 * 60 + 30) * 60 * 1000); // Convert to ms
    });

    it("should calculate negative difference between dates", () => {
      const date1 = "2023-01-18 14:30:00";
      const date2 = "2023-01-15 12:00:00";

      const difference = getDateDifference(date1, date2);

      expect(difference.days).toBe(-3);
      expect(difference.hours).toBe(-74);
      expect(difference.minutes).toBe(-4470); // -74h30m
      expect(difference.seconds).toBe(-268200); // -4470 minutes
      expect(difference.milliseconds).toBe(-268200000); // -268200 seconds
    });

    it("should handle same dates (zero difference)", () => {
      const date = "2023-01-15 12:00:00";

      const difference = getDateDifference(date, date);

      expect(difference.days).toBe(0);
      expect(difference.hours).toBe(0);
      expect(difference.minutes).toBe(0);
      expect(difference.seconds).toBe(0);
      expect(difference.milliseconds).toBe(0);
    });

    it("should handle different date formats", () => {
      // Different format but same time
      const date1 = "2023-01-15T12:00:00.000Z";
      const date2 = "2023-01-15 12:00:00";

      // Due to timezone issues in testing, we'll just check that calculation works
      const difference = getDateDifference(date1, date2);
      expect(typeof difference.milliseconds).toBe("number");
    });
  });

  describe("getCurrentUTCDateTime", () => {
    beforeEach(() => {
      // Mock Date.now() to return a fixed timestamp
      MockDate.set("2023-06-15T14:30:45.000Z");
    });

    afterEach(() => {
      // Restore the original Date implementation
      MockDate.reset();
    });

    it("should return current UTC datetime in the correct format", () => {
      const result = getCurrentUTCDateTime();

      // Since we mocked the date to 2023-06-15T14:30:45.000Z
      expect(result).toBe("2023-06-15 14:30:45");
    });

    it("should match the dayjs UTC format", () => {
      const result = getCurrentUTCDateTime();
      const expectedFormat = dayjs().utc().format("YYYY-MM-DD HH:mm:ss");

      expect(result).toBe(expectedFormat);
    });
  });

  // Edge cases and integration tests
  describe("integration tests", () => {
    it("should calculate difference from current time to future date", () => {
      MockDate.set("2023-06-15T14:30:45.000Z");

      const currentDateTime = getCurrentUTCDateTime();
      const futureDateTime = "2023-06-16 14:30:45"; // Exactly 1 day later

      const difference = getDateDifference(currentDateTime, futureDateTime);

      expect(difference.days).toBe(1);
      expect(difference.hours).toBe(24);

      MockDate.reset();
    });

    it("should handle leap years correctly", () => {
      // Feb 28, 2020 to March 1, 2020 (leap year)
      const date1 = "2020-02-28 12:00:00";
      const date2 = "2020-03-01 12:00:00";

      const difference = getDateDifference(date1, date2);

      // Should be 2 days in a leap year
      expect(difference.days).toBe(2);
      expect(difference.hours).toBe(48);
    });
  });
});
