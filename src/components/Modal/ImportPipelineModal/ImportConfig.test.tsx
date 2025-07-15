import { fireEvent, render, screen } from "@testing-library/react";
import {
  PipelineImportSource,
  WPQTImport,
  WPQTImportFilter,
} from "../../../types/imports";
import { ImportConfig } from "./ImportConfig";

// Mock WordPress i18n
jest.mock("@wordpress/i18n", () => ({
  __: (text: string) => text,
}));

describe("ImportConfig", () => {
  // Common test props
  const defaultImportData: WPQTImport = {
    pipelineName: "Test Pipeline",
    pipelineDescription: "Test Description",
    tasks: [],
    stages: [],
    labels: [],
    sourcePipelines: [
      { id: "1", name: "Source 1" },
      { id: "2", name: "Source 2" },
    ],
    taskComments: [],
  };

  const defaultImportDataFilter: WPQTImportFilter = {
    includeArchivedTasks: false,
    includeTaskComments: true,
    includeTaskCustomFields: false,
    sourcePipelinesFilter: [],
  };

  const defaultProps = {
    importData: defaultImportData,
    importDataFilter: defaultImportDataFilter,
    selectedImportSource: PipelineImportSource.PIPEDRIVE,
    onNameChange: jest.fn(),
    onDescriptionChange: jest.fn(),
    onImportDataFilterChange: jest.fn(),
    validation: {
      pipelineNameExists: false,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly with default props", () => {
    render(<ImportConfig {...defaultProps} />);

    // Check basic elements
    expect(screen.getByText("Board name")).toBeInTheDocument();
    expect(screen.getByText("Board description")).toBeInTheDocument();
    expect(screen.getByText("Import archived tasks?")).toBeInTheDocument();
    expect(screen.getByText("Import task comments?")).toBeInTheDocument();
    expect(screen.getByText("Filter by source")).toBeInTheDocument();

    // Check input values
    const nameInput = screen.getByDisplayValue("Test Pipeline");
    expect(nameInput).toBeInTheDocument();

    const descriptionInput = screen.getByDisplayValue("Test Description");
    expect(descriptionInput).toBeInTheDocument();

    // Check source pipeline options
    expect(screen.getByText("Source 1")).toBeInTheDocument();
    expect(screen.getByText("Source 2")).toBeInTheDocument();
  });

  test("shows validation error when pipeline name exists", () => {
    render(
      <ImportConfig
        {...defaultProps}
        validation={{ pipelineNameExists: true }}
      />,
    );

    expect(
      screen.getByText("This board name already exists."),
    ).toBeInTheDocument();
  });

  test("does not show source selection for non-Pipedrive imports", () => {
    render(
      <ImportConfig
        {...defaultProps}
        selectedImportSource={PipelineImportSource.QUICKTASKER}
      />,
    );

    expect(screen.queryByText("Filter by source")).not.toBeInTheDocument();
    expect(screen.queryByText("Source 1")).not.toBeInTheDocument();
  });

  test("calls onNameChange when board name is changed", () => {
    render(<ImportConfig {...defaultProps} />);

    const nameInput = screen.getByDisplayValue("Test Pipeline");
    fireEvent.change(nameInput, { target: { value: "New Name" } });

    expect(defaultProps.onNameChange).toHaveBeenCalledWith("New Name");
  });

  test("calls onDescriptionChange when board description is changed", () => {
    render(<ImportConfig {...defaultProps} />);

    const descriptionInput = screen.getByDisplayValue("Test Description");
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });

    expect(defaultProps.onDescriptionChange).toHaveBeenCalledWith(
      "New Description",
    );
  });

  test("toggles includeArchivedTasks when checkbox is clicked", () => {
    render(<ImportConfig {...defaultProps} />);

    // Use the data-testid to find the toggle
    const archivedTasksToggle = screen.getByTestId(
      "import-archived-tasks-toggle",
    );
    fireEvent.click(archivedTasksToggle);

    expect(defaultProps.onImportDataFilterChange).toHaveBeenCalledWith({
      ...defaultImportDataFilter,
      includeArchivedTasks: true,
    });
  });

  test("toggles includeTaskComments when checkbox is clicked", () => {
    render(<ImportConfig {...defaultProps} />);

    // Use the data-testid to find the toggle
    const taskCommentsToggle = screen.getByTestId(
      "import-task-comments-toggle",
    );
    fireEvent.click(taskCommentsToggle);

    expect(defaultProps.onImportDataFilterChange).toHaveBeenCalledWith({
      ...defaultImportDataFilter,
      includeTaskComments: false,
    });
  });

  test("toggles includeTaskCustomFields when checkbox is clicked", () => {
    render(<ImportConfig {...defaultProps} />);

    // Use the data-testid to find the toggle
    const taskCustomFieldsToggle = screen.getByTestId(
      "import-task-custom-fields-toggle",
    );
    fireEvent.click(taskCustomFieldsToggle);

    expect(defaultProps.onImportDataFilterChange).toHaveBeenCalledWith({
      ...defaultImportDataFilter,
      includeTaskCustomFields: true,
    });
  });

  test("adds source pipeline to filter when checkbox is checked", () => {
    render(<ImportConfig {...defaultProps} />);

    // Find the source pipeline checkbox and click it
    const sourcePipelineCheckbox = screen.getByLabelText("Source 1");
    fireEvent.click(sourcePipelineCheckbox);

    expect(defaultProps.onImportDataFilterChange).toHaveBeenCalledWith({
      ...defaultImportDataFilter,
      sourcePipelinesFilter: [{ id: "1", name: "Source 1" }],
    });
  });

  test("removes source pipeline from filter when checkbox is unchecked", () => {
    const filterWithSourcePipeline = {
      ...defaultImportDataFilter,
      sourcePipelinesFilter: [{ id: "1", name: "Source 1" }],
    };

    render(
      <ImportConfig
        {...defaultProps}
        importDataFilter={filterWithSourcePipeline}
      />,
    );

    // Find the source pipeline checkbox and click it
    const sourcePipelineCheckbox = screen.getByLabelText("Source 1");
    fireEvent.click(sourcePipelineCheckbox);

    expect(defaultProps.onImportDataFilterChange).toHaveBeenCalledWith({
      ...filterWithSourcePipeline,
      sourcePipelinesFilter: [],
    });
  });
});
