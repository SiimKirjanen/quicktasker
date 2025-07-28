import { render, screen } from "@testing-library/react";
import { CustomFieldTitle } from "./CustomFieldTitle";

describe("CustomFieldTitle", () => {
  it("renders the name", () => {
    render(<CustomFieldTitle name="Test Name" description={null} />);
    expect(screen.getByText("Test Name")).toBeInTheDocument();
  });

  it("renders the description if provided", () => {
    render(
      <CustomFieldTitle name="Test Name" description="Test Description" />,
    );
    expect(screen.getByText("Test Description")).toBeInTheDocument();
  });

  it("does not render description if it is null", () => {
    render(<CustomFieldTitle name="Test Name" description={null} />);
    expect(screen.queryByText("Test Description")).not.toBeInTheDocument();
  });
});
