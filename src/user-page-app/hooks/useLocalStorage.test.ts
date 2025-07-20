import { renderHook } from "@testing-library/react";
import { WPQTComment } from "../../types/comment";
import { UserTypes } from "../../types/user";
import { useLocalStorage } from "./useLocalStorage";

// Mock the WordPress element module with createContext
jest.mock("@wordpress/element", () => ({
  useContext: jest.fn(),
  createContext: jest.fn((defaultValue) => ({
    Provider: ({ children }: { children: React.ReactNode }) => children,
    Consumer: ({
      children,
    }: {
      children: (value: unknown) => React.ReactNode;
    }) => children(defaultValue),
  })),
}));

// Mock the comment utility functions
jest.mock("../../utils/comment", () => ({
  filterOutOldComments: jest.fn(),
  filterNewComments: jest.fn(),
}));

// Import after mocking
import { useContext } from "@wordpress/element";
import { filterNewComments, filterOutOldComments } from "../../utils/comment";

const mockFilterOutOldComments = filterOutOldComments as jest.MockedFunction<
  typeof filterOutOldComments
>;
const mockFilterNewComments = filterNewComments as jest.MockedFunction<
  typeof filterNewComments
>;
const mockUseContext = useContext as jest.MockedFunction<typeof useContext>;

describe("useLocalStorage", () => {
  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
  };
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  // Mock console.error
  const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

  const createMockComment = (id: string): WPQTComment => ({
    id,
    text: `Comment ${id}`,
    created_at: "2024-01-01 12:00:00",
    author_name: "Test User",
    type: "task",
    type_id: "1",
    author_id: `user-${id}`,
    author_type: "quicktasker",
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default context using the mocked function
    mockUseContext.mockReturnValue({
      state: {
        pageHash: "test-page-hash",
        userId: "user-123",
        userType: UserTypes.QUICKTASKER,
      },
    });
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  describe("getStoredComments", () => {
    test("returns parsed comments from localStorage", async () => {
      const mockComments = [createMockComment("1")];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockComments));

      const { result } = renderHook(() => useLocalStorage());
      const comments = await result.current.getStoredComments();

      expect(comments).toEqual(mockComments);
    });

    test("returns empty array when no data exists", async () => {
      localStorageMock.getItem.mockReturnValue(null);

      const { result } = renderHook(() => useLocalStorage());
      const comments = await result.current.getStoredComments();

      expect(comments).toEqual([]);
    });

    test("handles errors gracefully", async () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error("Storage error");
      });

      const { result } = renderHook(() => useLocalStorage());
      const comments = await result.current.getStoredComments();

      expect(comments).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error retrieving stored comments:",
        expect.any(Error),
      );
    });
  });

  describe("storeComments", () => {
    test("stores filtered comments correctly", async () => {
      const existingComments = [createMockComment("1")];
      const newComments = [createMockComment("2")];
      const filteredOld = [createMockComment("1")];
      const filteredNew = [createMockComment("2")];

      localStorageMock.getItem.mockReturnValue(
        JSON.stringify(existingComments),
      );
      mockFilterOutOldComments.mockReturnValue(filteredOld);
      mockFilterNewComments.mockReturnValue(filteredNew);

      const { result } = renderHook(() => useLocalStorage());
      await result.current.storeComments(newComments);

      expect(mockFilterOutOldComments).toHaveBeenCalledWith(existingComments);
      expect(mockFilterNewComments).toHaveBeenCalledWith(
        newComments,
        filteredOld,
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "wpqt-stored-comments-test-page-hash",
        JSON.stringify([...filteredOld, ...filteredNew]),
      );
    });

    test("handles storage errors gracefully", async () => {
      // Mock setItem to throw an error instead of getItem
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error("Storage error");
      });

      // Make getItem return empty to avoid the retrieval error
      localStorageMock.getItem.mockReturnValue(null);

      // Mock the filter functions to return empty arrays
      mockFilterOutOldComments.mockReturnValue([]);
      mockFilterNewComments.mockReturnValue([createMockComment("1")]);

      const { result } = renderHook(() => useLocalStorage());
      await result.current.storeComments([createMockComment("1")]);

      expect(consoleSpy).toHaveBeenCalledWith(
        "Error storing comments:",
        expect.any(Error),
      );
    });
  });

  test("uses correct storage key based on user type", () => {
    const { result } = renderHook(() => useLocalStorage());
    result.current.getStoredComments();

    expect(localStorageMock.getItem).toHaveBeenCalledWith(
      "wpqt-stored-comments-test-page-hash",
    );
  });
});
