import { fireEvent, render, screen } from "@testing-library/react";
import { Info } from "./Info";

describe("Info Component", () => {
  const defaultProps = {
    infoDescription: "Test description",
  };

  it("renders the description text correctly", () => {
    render(<Info {...defaultProps} />);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("renders the title when provided", () => {
    render(<Info {...defaultProps} infoTitle="Test Title" />);
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("does not render the title when not provided", () => {
    render(<Info {...defaultProps} />);
    expect(screen.queryByText("Test Title")).not.toBeInTheDocument();
  });

  it("adds cursor pointer class when infoTitleClick prop is provided", () => {
    render(
      <Info
        {...defaultProps}
        infoTitle="Test Title"
        infoTitleClick={() => {}}
      />,
    );

    const titleContainer = screen.getByText("Test Title").parentElement;
    expect(titleContainer).toHaveClass("wpqt-cursor-pointer");
  });

  it("does not add cursor pointer class when infoTitleClick prop is not provided", () => {
    render(<Info {...defaultProps} infoTitle="Test Title" />);

    const titleContainer = screen.getByText("Test Title").parentElement;
    expect(titleContainer).not.toHaveClass("wpqt-cursor-pointer");
  });

  it("calls infoTitleClick when title is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Info
        {...defaultProps}
        infoTitle="Test Title"
        infoTitleClick={handleClick}
      />,
    );

    fireEvent.click(screen.getByText("Test Title"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("renders children correctly", () => {
    render(
      <Info {...defaultProps}>
        <button>Test Button</button>
      </Info>,
    );

    expect(
      screen.getByRole("button", { name: "Test Button" }),
    ).toBeInTheDocument();
  });

  it("renders title and description with correct styles", () => {
    render(<Info {...defaultProps} infoTitle="Test Title" />);

    const titleElement = screen.getByText("Test Title");
    expect(titleElement).toHaveClass("wpqt-font-semibold", "wpqt-text-lg");

    const descriptionElement = screen.getByText("Test description");
    expect(descriptionElement.tagName.toLowerCase()).toBe("p");
  });

  it("does not execute click handler when title has no click function", () => {
    const handleClick = jest.fn();
    render(<Info {...defaultProps} infoTitle="Test Title" />);

    fireEvent.click(screen.getByText("Test Title"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
