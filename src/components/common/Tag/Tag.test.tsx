import { render, screen } from "@testing-library/react";
import { WPQTTag } from "./Tag";

describe("WPQTTag Component", () => {
  test("renders children content", () => {
    render(<WPQTTag>Tag Content</WPQTTag>);

    expect(screen.getByText("Tag Content")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    render(<WPQTTag className="custom-class">Content</WPQTTag>);

    const tag = screen.getByText("Content");
    expect(tag).toHaveClass("custom-class");
  });

  test("applies inline styles", () => {
    render(
      <WPQTTag inlineStyle={{ backgroundColor: "red" }}>
        Styled Content
      </WPQTTag>,
    );

    const tag = screen.getByText("Styled Content");
    expect(tag).toHaveStyle("background-color: red");
  });
});
