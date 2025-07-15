import { fireEvent, render, screen } from "@testing-library/react";
import { PipelineImportSource } from "../../../types/imports";
import { ImportSourceSelection } from "./importSourceSelection";

jest.mock("./../../../../img/icon-80x80.png", () => "mock-image-path");

describe("ImportSourceSelection", () => {
  const handleImportSourceChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all import source options", () => {
    render(
      <ImportSourceSelection
        selectedImportSource={PipelineImportSource.TRELLO}
        handleImportSourceChange={handleImportSourceChange}
      />,
    );

    // Check that all four source icons are present
    expect(screen.getByTestId("trello-icon")).toBeInTheDocument();
    expect(screen.getByTestId("asana-icon")).toBeInTheDocument();
    expect(screen.getByTestId("pipedrive-icon")).toBeInTheDocument();
    expect(screen.getByTestId("quicktasker-icon")).toBeInTheDocument();
  });

  test("highlights the currently selected source", () => {
    const { rerender } = render(
      <ImportSourceSelection
        selectedImportSource={PipelineImportSource.TRELLO}
        handleImportSourceChange={handleImportSourceChange}
      />,
    );

    // Trello should have the border class
    expect(screen.getByTestId("trello-container")).toHaveClass(
      "wpqt-border-blue-500",
    );
    expect(screen.getByTestId("asana-container")).not.toHaveClass(
      "wpqt-border-blue-500",
    );
    expect(screen.getByTestId("pipedrive-container")).not.toHaveClass(
      "wpqt-border-blue-500",
    );
    expect(screen.getByTestId("quicktasker-container")).not.toHaveClass(
      "wpqt-border-blue-500",
    );

    // Rerender with a different selected source
    rerender(
      <ImportSourceSelection
        selectedImportSource={PipelineImportSource.ASANA}
        handleImportSourceChange={handleImportSourceChange}
      />,
    );

    // Now Asana should have the border class
    expect(screen.getByTestId("trello-container")).not.toHaveClass(
      "wpqt-border-blue-500",
    );
    expect(screen.getByTestId("asana-container")).toHaveClass(
      "wpqt-border-blue-500",
    );
    expect(screen.getByTestId("pipedrive-container")).not.toHaveClass(
      "wpqt-border-blue-500",
    );
    expect(screen.getByTestId("quicktasker-container")).not.toHaveClass(
      "wpqt-border-blue-500",
    );
  });

  test("calls handleImportSourceChange when a source is clicked", () => {
    render(
      <ImportSourceSelection
        selectedImportSource={PipelineImportSource.TRELLO}
        handleImportSourceChange={handleImportSourceChange}
      />,
    );

    // Click on each source and verify the handler is called with the correct source
    fireEvent.click(screen.getByTestId("asana-container"));
    expect(handleImportSourceChange).toHaveBeenCalledWith(
      PipelineImportSource.ASANA,
    );

    fireEvent.click(screen.getByTestId("pipedrive-container"));
    expect(handleImportSourceChange).toHaveBeenCalledWith(
      PipelineImportSource.PIPEDRIVE,
    );

    fireEvent.click(screen.getByTestId("quicktasker-container"));
    expect(handleImportSourceChange).toHaveBeenCalledWith(
      PipelineImportSource.QUICKTASKER,
    );

    fireEvent.click(screen.getByTestId("trello-container"));
    expect(handleImportSourceChange).toHaveBeenCalledWith(
      PipelineImportSource.TRELLO,
    );

    // Verify the handler was called 4 times in total
    expect(handleImportSourceChange).toHaveBeenCalledTimes(4);
  });
});
