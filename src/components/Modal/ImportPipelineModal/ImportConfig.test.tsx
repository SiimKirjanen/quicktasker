import { fireEvent, render, screen } from "@testing-library/react";
import { WPQTImport, WPQTImportFilter } from "../../../types/imports";
import { ImportConfig } from "./ImportConfig";

describe("ImportConfig Component", () => {
  const mockImportData: WPQTImport = {
    pipelineName: "Test Pipeline",
    pipelineDescription: "Pipeline description",
    stages: [],
    tasks: [],
    labels: [],
  };

  const mockImportDataFilter: WPQTImportFilter = {
    includeArchivedTasks: true,
  };

  const mockOnNameChange = jest.fn();
  const mockOnDescriptionChange = jest.fn();
  const mockOnImportDataFilterChange = jest.fn();

  it("should render the board name input and handle changes", () => {
    render(
      <ImportConfig
        importData={mockImportData}
        importDataFilter={mockImportDataFilter}
        onNameChange={mockOnNameChange}
        onDescriptionChange={mockOnDescriptionChange}
        onImportDataFilterChange={mockOnImportDataFilterChange}
        validation={{ pipelineNameExists: false }}
      />,
    );

    const nameInput = screen.getByDisplayValue("Test Pipeline");
    expect(nameInput).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "New Pipeline Name" } });
    expect(mockOnNameChange).toHaveBeenCalledWith("New Pipeline Name");
  });

  it("should render the board description textarea and handle changes", () => {
    render(
      <ImportConfig
        importData={mockImportData}
        importDataFilter={mockImportDataFilter}
        onNameChange={mockOnNameChange}
        onDescriptionChange={mockOnDescriptionChange}
        onImportDataFilterChange={mockOnImportDataFilterChange}
        validation={{ pipelineNameExists: false }}
      />,
    );

    const descriptionTextarea = screen.getByDisplayValue(
      "Pipeline description",
    );
    expect(descriptionTextarea).toBeInTheDocument();

    fireEvent.change(descriptionTextarea, {
      target: { value: "New Description" },
    });
    expect(mockOnDescriptionChange).toHaveBeenCalledWith("New Description");
  });

  it("should render the toggle for archived tasks and handle changes", () => {
    render(
      <ImportConfig
        importData={mockImportData}
        importDataFilter={mockImportDataFilter}
        onNameChange={mockOnNameChange}
        onDescriptionChange={mockOnDescriptionChange}
        onImportDataFilterChange={mockOnImportDataFilterChange}
        validation={{ pipelineNameExists: false }}
      />,
    );

    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toBeChecked();

    fireEvent.click(toggle);
    expect(mockOnImportDataFilterChange).toHaveBeenCalledWith({
      ...mockImportDataFilter,
      includeArchivedTasks: false,
    });
  });

  it("should display an error message if the board name already exists", () => {
    render(
      <ImportConfig
        importData={mockImportData}
        importDataFilter={mockImportDataFilter}
        onNameChange={mockOnNameChange}
        onDescriptionChange={mockOnDescriptionChange}
        onImportDataFilterChange={mockOnImportDataFilterChange}
        validation={{ pipelineNameExists: true }}
      />,
    );

    const errorMessage = screen.getByText("This board name already exists.");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("wpqt-text-red-500");
  });
});
