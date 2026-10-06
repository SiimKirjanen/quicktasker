import { render, screen } from "@testing-library/react";
import { CreatedByDataItem } from "./CreatedByDataItem";

function renderItem(props: Partial<Parameters<typeof CreatedByDataItem>[0]>) {
  return render(
    <CreatedByDataItem
      createdBy="3"
      createdByName="Anna"
      testId="api-token"
      {...props}
    />,
  );
}

describe("CreatedByDataItem", () => {
  it("shows who created the item", () => {
    renderItem({ hasBoardAccess: true });

    expect(screen.getByText("Created by:")).toBeInTheDocument();
    expect(screen.getByTestId("api-token-created-by")).toHaveTextContent(
      "Anna",
    );
    expect(
      screen.queryByTestId("api-token-creator-no-board-access"),
    ).toBeNull();
  });

  it("warns when the creator no longer has access to the board", () => {
    renderItem({ hasBoardAccess: false });

    expect(
      screen.getByTestId("api-token-creator-no-board-access"),
    ).toHaveTextContent("No access to this board");
  });

  it("does not warn when the creator's access is unknown", () => {
    renderItem({ hasBoardAccess: null });

    expect(
      screen.queryByTestId("api-token-creator-no-board-access"),
    ).toBeNull();
  });

  it("names a deleted creator", () => {
    renderItem({ createdByName: null, hasBoardAccess: null });

    expect(screen.getByTestId("api-token-created-by")).toHaveTextContent(
      "Deleted user",
    );
  });

  it("shows nothing when the creator is unknown", () => {
    const { container } = renderItem({ createdBy: null, createdByName: null });

    expect(container).toBeEmptyDOMElement();
  });
});
