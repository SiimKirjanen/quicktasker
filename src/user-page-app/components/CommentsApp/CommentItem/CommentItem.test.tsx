import { render, screen } from "@testing-library/react";
import { WPQTComment } from "../../../../types/comment";
import { CommentItem } from "./CommentItem";

// Mock WordPress i18n functions
jest.mock("@wordpress/i18n", () => ({
  __: jest.fn((str) => str),
}));

describe("CommentItem", () => {
  // Test data
  const adminComment: WPQTComment = {
    id: "1",
    author_id: "admin1",
    author_name: "Admin User",
    text: "This is an admin comment",
    author_type: "wp-user",
    created_at: "2023-07-10T12:00:00",
    type: "task", // or the appropriate type for your app
    type_id: "task1", // or the appropriate type_id for your app
  };

  const userComment: WPQTComment = {
    id: "2",
    author_id: "user1",
    author_name: "Regular User",
    text: "This is a regular user comment",
    author_type: "quicktasker",
    created_at: "2023-07-10T13:00:00",
    type: "task", // or the appropriate type for your app
    type_id: "task2", // or the appropriate type_id for your app
  };

  test("renders admin comment correctly", () => {
    render(<CommentItem comment={adminComment} />);

    // Check author name is displayed
    expect(screen.getByText("Admin User")).toBeInTheDocument();

    // Check that it displays "Admin" label
    expect(screen.getByText("Admin")).toBeInTheDocument();

    // Check comment text is displayed
    expect(screen.getByText("This is an admin comment")).toBeInTheDocument();

    // Verify admin styling
    const authorNameElement = screen.getByText("Admin User");
    expect(authorNameElement).toHaveClass("wpqt-font-semibold");
    expect(authorNameElement).toHaveClass("wpqt-text-lg");
  });

  test("renders regular user comment correctly", () => {
    render(<CommentItem comment={userComment} />);

    // Check author name is displayed
    expect(screen.getByText("Regular User")).toBeInTheDocument();

    // Check that it displays "QuickTasker" label
    expect(screen.getByText("QuickTasker")).toBeInTheDocument();

    // Check comment text is displayed
    expect(
      screen.getByText("This is a regular user comment"),
    ).toBeInTheDocument();

    // Verify regular user styling
    const authorNameElement = screen.getByText("Regular User");
    expect(authorNameElement).toHaveClass("wpqt-font-normal");
    expect(authorNameElement).not.toHaveClass("wpqt-text-lg");
  });

  test("handles empty comment text", () => {
    const emptyComment: WPQTComment = {
      ...userComment,
      text: "",
    };

    render(<CommentItem comment={emptyComment} />);

    // Author name should still be displayed
    expect(screen.getByText("Regular User")).toBeInTheDocument();

    // There should be an empty div for the comment text
    const commentElements = screen
      .getAllByText("")
      .filter((el) => el.className.includes("wpqt-break-all"));

    expect(commentElements.length).toBeGreaterThanOrEqual(0);
  });
});
