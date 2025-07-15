import { render } from "@testing-library/react";
import { WPQTImport } from "../../../types/imports";
import { ImportInfo } from "./ImportInfo";

// Mock WordPress i18n
jest.mock("@wordpress/i18n", () => ({
  __: (text: string) => text,
}));

describe("ImportInfo", () => {
  // Test data setup
  const createMockImportData = (overrides = {}): WPQTImport => ({
    pipelineName: "Test Pipeline",
    pipelineDescription: "Test Description",
    tasks: [
      {
        taskId: "1",
        archived: false,
        taskName: "Task 1",
        taskDescription: "",
        stageId: "1",
        taskCompletedAt: null,
        dueDate: null,
        taskFocusColor: null,
        assignedLabels: [],
        sourcePipeline: { name: "Source", id: "source1" },
        customFields: [],
      },
      {
        taskId: "2",
        archived: true,
        taskName: "Task 2",
        taskDescription: "",
        stageId: "1",
        taskCompletedAt: null,
        dueDate: null,
        taskFocusColor: null,
        assignedLabels: [],
        sourcePipeline: { name: "Source", id: "source1" },
        customFields: [],
      },
      {
        taskId: "3",
        archived: false,
        taskName: "Task 3",
        taskDescription: "",
        stageId: "2",
        taskCompletedAt: null,
        dueDate: null,
        taskFocusColor: null,
        assignedLabels: [],
        sourcePipeline: { name: "Source", id: "source1" },
        customFields: [],
      },
    ],
    stages: [
      {
        stageId: "1",
        stageName: "Stage 1",
        stageDescription: "",
        sourcePipeline: { name: "Source", id: "source1" },
      },
      {
        stageId: "2",
        stageName: "Stage 2",
        stageDescription: "",
        sourcePipeline: { name: "Source", id: "source1" },
      },
    ],
    labels: [{ labelId: "1", labelName: "Label 1", color: "#ff0000" }],
    taskComments: [
      {
        commentId: "1",
        taskId: "1",
        createdAt: "2023-01-01",
        commentText: "Comment 1",
        authorId: "user1",
        isAuthorAdmin: false,
        isPrivate: false,
      },
      {
        commentId: "2",
        taskId: "1",
        createdAt: "2023-01-02",
        commentText: "Comment 2",
        authorId: "user1",
        isAuthorAdmin: false,
        isPrivate: false,
      },
    ],
    sourcePipelines: [{ name: "Source", id: "source1" }],
    ...overrides,
  });

  test("renders with correct counts", () => {
    const mockData = createMockImportData();
    const { container } = render(<ImportInfo importData={mockData} />);

    // Just check the text content of the entire component
    expect(container).toHaveTextContent("Number of tasks");
    expect(container).toHaveTextContent("3");
    expect(container).toHaveTextContent("archived");
    expect(container).toHaveTextContent("1");
    expect(container).toHaveTextContent("Number of task comments");
    expect(container).toHaveTextContent("2");
    expect(container).toHaveTextContent("Number of stages");
    expect(container).toHaveTextContent("2");
    expect(container).toHaveTextContent("Number of labels");
    expect(container).toHaveTextContent("1");
  });

  test("handles empty data gracefully", () => {
    const emptyData = createMockImportData({
      tasks: [],
      stages: [],
      labels: [],
      taskComments: [],
    });

    const { container } = render(<ImportInfo importData={emptyData} />);

    expect(container).toHaveTextContent("Number of tasks");
    expect(container).toHaveTextContent("archived 0");
    expect(container).toHaveTextContent("Number of task comments");
    expect(container).toHaveTextContent("Number of stages");
    expect(container).toHaveTextContent("Number of labels");

    // Check all counts are zero
    const textContent = container.textContent || ""; // Add this null check
    // Count occurrences of "0" in the text content
    const zeroCount = (textContent.match(/0/g) || []).length;
    // We expect 4 zeros: tasks, archived, comments, stages, labels
    expect(zeroCount).toBeGreaterThanOrEqual(4);
  });

  test("displays correct archived task count", () => {
    const customData = createMockImportData({
      tasks: [
        {
          taskId: "1",
          archived: true,
          taskName: "Task 1",
          taskDescription: "",
          stageId: "1",
          taskCompletedAt: null,
          dueDate: null,
          taskFocusColor: null,
          assignedLabels: [],
          sourcePipeline: { name: "Source", id: "source1" },
          customFields: [],
        },
        {
          taskId: "2",
          archived: true,
          taskName: "Task 2",
          taskDescription: "",
          stageId: "1",
          taskCompletedAt: null,
          dueDate: null,
          taskFocusColor: null,
          assignedLabels: [],
          sourcePipeline: { name: "Source", id: "source1" },
          customFields: [],
        },
        {
          taskId: "3",
          archived: false,
          taskName: "Task 3",
          taskDescription: "",
          stageId: "2",
          taskCompletedAt: null,
          dueDate: null,
          taskFocusColor: null,
          assignedLabels: [],
          sourcePipeline: { name: "Source", id: "source1" },
          customFields: [],
        },
        {
          taskId: "4",
          archived: false,
          taskName: "Task 4",
          taskDescription: "",
          stageId: "2",
          taskCompletedAt: null,
          dueDate: null,
          taskFocusColor: null,
          assignedLabels: [],
          sourcePipeline: { name: "Source", id: "source1" },
          customFields: [],
        },
        {
          taskId: "5",
          archived: true,
          taskName: "Task 5",
          taskDescription: "",
          stageId: "1",
          taskCompletedAt: null,
          dueDate: null,
          taskFocusColor: null,
          assignedLabels: [],
          sourcePipeline: { name: "Source", id: "source1" },
          customFields: [],
        },
      ],
    });

    const { container } = render(<ImportInfo importData={customData} />);

    expect(container).toHaveTextContent("Number of tasks");
    expect(container).toHaveTextContent("5");
    expect(container).toHaveTextContent("archived");
    expect(container).toHaveTextContent("3");
  });
});
