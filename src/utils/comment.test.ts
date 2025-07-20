import { WPQTComment } from "../types/comment";
import { filterNewComments, filterOutOldComments } from "./comment";
import { getCurrentUTCDateTime, getDateDifference } from "./date";

// Mock the date utilities
jest.mock("./date", () => ({
  getCurrentUTCDateTime: jest.fn(),
  getDateDifference: jest.fn(),
}));

describe("Comment Utils", () => {
  const mockGetCurrentUTCDateTime =
    getCurrentUTCDateTime as jest.MockedFunction<typeof getCurrentUTCDateTime>;
  const mockGetDateDifference = getDateDifference as jest.MockedFunction<
    typeof getDateDifference
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetCurrentUTCDateTime.mockReturnValue("2024-01-10 12:00:00");
  });

  describe("filterNewComments", () => {
    const createMockComment = (id: string): WPQTComment => ({
      id,
      text: `Comment ${id}`,
      created_at: "2024-01-01 12:00:00",
      author_name: "Test User",
      type: "task",
      type_id: "1",
      author_id: "user-123",
      author_type: "quicktasker",
    });

    test("returns all comments when stored comments is empty", () => {
      const comments = [createMockComment("1"), createMockComment("2")];
      const storedComments: WPQTComment[] = [];

      const result = filterNewComments(comments, storedComments);

      expect(result).toEqual(comments);
      expect(result).toHaveLength(2);
    });

    test("filters out comments that already exist in stored comments", () => {
      const comments = [
        createMockComment("1"),
        createMockComment("2"),
        createMockComment("3"),
      ];
      const storedComments = [createMockComment("1"), createMockComment("3")];

      const result = filterNewComments(comments, storedComments);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    test("returns empty array when all comments already exist", () => {
      const comments = [createMockComment("1"), createMockComment("2")];
      const storedComments = [createMockComment("1"), createMockComment("2")];

      const result = filterNewComments(comments, storedComments);

      expect(result).toEqual([]);
    });

    test("handles empty comments array", () => {
      const comments: WPQTComment[] = [];
      const storedComments = [createMockComment("1")];

      const result = filterNewComments(comments, storedComments);

      expect(result).toEqual([]);
    });
  });

  describe("filterOutOldComments", () => {
    // Helper function to create complete date difference objects
    const createDateDifference = (days: number) => ({
      milliseconds: 0,
      seconds: 0,
      minutes: 0,
      hours: 0,
      days,
    });

    const createCommentWithDate = (
      id: string,
      created_at: string | null,
    ): WPQTComment => ({
      id,
      text: `Comment ${id}`,
      created_at: created_at || "",
      author_name: "Test User",
      type: "task",
      type_id: "1",
      author_id: `user-${id}`,
      author_type: "quicktasker",
    });

    test("keeps comments that are 5 days old or newer", () => {
      const comments = [
        createCommentWithDate("1", "2024-01-05 12:00:00"),
        createCommentWithDate("2", "2024-01-08 12:00:00"),
        createCommentWithDate("3", "2024-01-10 12:00:00"),
      ];

      mockGetDateDifference
        .mockReturnValueOnce(createDateDifference(5))
        .mockReturnValueOnce(createDateDifference(2))
        .mockReturnValueOnce(createDateDifference(0));

      const result = filterOutOldComments(comments);

      expect(result).toHaveLength(3);
      expect(result.map((c) => c.id)).toEqual(["1", "2", "3"]);
    });

    test("filters out comments older than 5 days", () => {
      const comments = [
        createCommentWithDate("1", "2024-01-01 12:00:00"),
        createCommentWithDate("2", "2024-01-08 12:00:00"),
        createCommentWithDate("3", "2024-01-03 12:00:00"),
      ];

      mockGetDateDifference
        .mockReturnValueOnce(createDateDifference(9))
        .mockReturnValueOnce(createDateDifference(2))
        .mockReturnValueOnce(createDateDifference(7));

      const result = filterOutOldComments(comments);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("2");
    });

    test("filters out comments with no created_at date", () => {
      const comments = [
        createCommentWithDate("1", "2024-01-08 12:00:00"),
        createCommentWithDate("2", ""),
        createCommentWithDate("3", null),
      ];

      // Use your helper function instead of manually creating the object
      mockGetDateDifference.mockReturnValueOnce(createDateDifference(2));

      const result = filterOutOldComments(comments);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");
    });

    test("handles getDateDifference throwing an error", () => {
      const consoleSpy = jest
        .spyOn(console, "error")
        .mockImplementation(() => {});

      const comments = [
        createCommentWithDate("1", "2024-01-08 12:00:00"),
        createCommentWithDate("2", "2024-01-05 12:00:00"),
      ];

      // Mock the first call to succeed, second to throw
      mockGetDateDifference
        .mockReturnValueOnce(createDateDifference(2))
        .mockImplementationOnce(() => {
          throw new Error("Date calculation failed");
        });

      const result = filterOutOldComments(comments);

      expect(result).toHaveLength(1);
      expect(result[0].id).toBe("1");

      // Update the expected error message to match the actual implementation
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error filtering old comment: ",
        expect.any(Error),
      );

      consoleSpy.mockRestore();
    });

    test("returns empty array for empty input", () => {
      const result = filterOutOldComments([]);

      expect(result).toEqual([]);
      expect(mockGetCurrentUTCDateTime).toHaveBeenCalledTimes(1);
    });

    test("calls getCurrentUTCDateTime once per function call", () => {
      const comments = [
        createCommentWithDate("1", "2024-01-08 12:00:00"),
        createCommentWithDate("2", "2024-01-09 12:00:00"),
      ];

      mockGetDateDifference.mockReturnValue(createDateDifference(2));

      filterOutOldComments(comments);

      expect(mockGetCurrentUTCDateTime).toHaveBeenCalledTimes(1);
      expect(mockGetDateDifference).toHaveBeenCalledTimes(2);
    });
  });
});
