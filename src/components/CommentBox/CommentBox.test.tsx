import { render, screen } from "@testing-library/react";
import { CommentBox } from "./CommentBox";

describe("CommentBox", () => {
  it("renders author name, type, and date", () => {
    render(
      <CommentBox
        authorName="John Doe"
        authorType="quicktasker"
        commentDate="2026-02-10"
      >
        Test comment
      </CommentBox>,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("(QuickTasker)")).toBeInTheDocument();
    expect(screen.getByText("2026-02-10")).toBeInTheDocument();
    expect(screen.getByText("Test comment")).toBeInTheDocument();
  });

  it("renders WP User when authorType is wp-user", () => {
    render(
      <CommentBox
        authorName="Jane"
        authorType="wp-user"
        commentDate="2026-02-11"
      />,
    );
    expect(screen.getByText("(WP User)")).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <CommentBox
        authorName="Alex"
        authorType="quicktasker"
        commentDate="2026-02-12"
      >
        <div>Child content</div>
      </CommentBox>,
    );
    expect(screen.getByText("Child content")).toBeInTheDocument();
  });
});
