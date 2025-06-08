import { DEFAULT_IMPORT_LABEL_COLOR } from "../../constants";
import { AsanaImport, TrelloImport, WPQTImport } from "../../types/imports";
import {
  normalizeAsanaImport,
  normalizeTrelloImport,
} from "./normalize-import";

describe("normalizeTrelloImport", () => {
  it("should normalize Trello import data correctly", () => {
    const trelloData: TrelloImport = {
      name: "Test Pipeline",
      desc: "Pipeline description",
      lists: [
        { id: "list1", idBoard: "board1", name: "Stage 1", closed: false },
        { id: "list2", idBoard: "board1", name: "Stage 2", closed: true },
      ],
      cards: [
        {
          id: "card1",
          name: "Task 1",
          idBoard: "board1",
          idList: "list1",
          closed: false,
          labels: [
            { id: "label1", idBoard: "board1", name: "Label 1", color: "red" },
          ],
          due: "2025-06-09T12:25:00.000Z",
          dateCompleted: null,
        },
        {
          id: "card2",
          name: "Task 2",
          idBoard: "board1",
          idList: "list1",
          closed: true,
          labels: [],
          due: null,
          dateCompleted: "2025-06-07T12:25:00.000Z",
        },
      ],
      labels: [
        { id: "label1", idBoard: "board1", name: "Label 1", color: "red" },
        { id: "label2", idBoard: "board1", name: "Label 2", color: "blue" },
      ],
    };

    const expectedResult: WPQTImport = {
      pipelineName: "Test Pipeline",
      pipelineDescription: "Pipeline description",
      stages: [
        { stageName: "Stage 1", stageDescription: "", stageId: "list1" },
      ],
      tasks: [
        {
          taskName: "Task 1",
          taskDescription: "",
          stageId: "list1",
          archived: false,
          assignedLabels: [
            { labelName: "Label 1", labelId: "label1", color: "red" },
          ],
          dueDate: "2025-06-09T12:25:00.000Z",
          taskCompletedAt: null,
        },
        {
          taskName: "Task 2",
          taskDescription: "",
          stageId: "list1",
          archived: true,
          assignedLabels: [],
          dueDate: null,
          taskCompletedAt: "2025-06-07T12:25:00.000Z",
        },
      ],
      labels: [
        { labelName: "Label 1", labelId: "label1", color: "red" },
        { labelName: "Label 2", labelId: "label2", color: "blue" },
      ],
    };

    const result = normalizeTrelloImport(trelloData);
    expect(result).toEqual(expectedResult);
  });

  it("should handle empty Trello import data", () => {
    const trelloData: TrelloImport = {
      name: "",
      desc: "",
      lists: [],
      cards: [],
      labels: [],
    };

    const expectedResult: WPQTImport = {
      pipelineName: "",
      pipelineDescription: "",
      stages: [],
      tasks: [],
      labels: [],
    };

    const result = normalizeTrelloImport(trelloData);
    expect(result).toEqual(expectedResult);
  });

  it("should filter out closed lists", () => {
    const trelloData: TrelloImport = {
      name: "Pipeline",
      desc: "Description",
      lists: [
        { id: "list1", idBoard: "board1", name: "Stage 1", closed: false },
        { id: "list2", idBoard: "board1", name: "Stage 2", closed: true },
      ],
      cards: [],
      labels: [],
    };

    const expectedResult: WPQTImport = {
      pipelineName: "Pipeline",
      pipelineDescription: "Description",
      stages: [
        { stageName: "Stage 1", stageDescription: "", stageId: "list1" },
      ],
      tasks: [],
      labels: [],
    };

    const result = normalizeTrelloImport(trelloData);
    expect(result.stages).toEqual(expectedResult.stages);
  });
});

describe("normalizeAsanaImport", () => {
  it("should normalize Asana import data correctly", () => {
    const asanaData: AsanaImport = {
      data: [
        {
          gid: "task1",
          name: "Task 1",
          completed: false,
          completed_at: null,
          due_on: "2025-06-10",
          due_at: null,
          tags: [
            {
              gid: "tag1",
              name: "Important",
            },
            {
              gid: "tag2",
              name: "Bug",
            },
          ],
          projects: [
            {
              gid: "project1",
              name: "Development Pipeline",
            },
          ],
          memberships: [
            {
              project: {
                gid: "project1",
                name: "Development Pipeline",
              },
              section: {
                gid: "section1",
                name: "To Do",
              },
            },
          ],
        },
        {
          gid: "task2",
          name: "Task 2",
          completed: true,
          completed_at: "2025-06-05T14:30:00.000Z",
          due_on: null,
          due_at: "2025-06-08T23:59:59.000Z",
          tags: [
            {
              gid: "tag2",
              name: "Bug",
            },
          ],
          projects: [
            {
              gid: "project1",
              name: "Development Pipeline",
            },
          ],
          memberships: [
            {
              project: {
                gid: "project1",
                name: "Development Pipeline",
              },
              section: {
                gid: "section2",
                name: "Done",
              },
            },
          ],
        },
        {
          gid: "task3",
          name: "Task 3",
          completed: false,
          completed_at: null,
          due_on: null,
          due_at: null,
          tags: [],
          projects: [
            {
              gid: "project1",
              name: "Development Pipeline",
            },
          ],
          memberships: [
            {
              project: {
                gid: "project1",
                name: "Development Pipeline",
              },
              section: {
                gid: "section1",
                name: "To Do",
              },
            },
          ],
        },
      ],
    };

    const expectedResult: WPQTImport = {
      pipelineName: "Development Pipeline",
      pipelineDescription: "",
      stages: [
        { stageId: "section1", stageName: "To Do", stageDescription: "" },
        { stageId: "section2", stageName: "Done", stageDescription: "" },
      ],
      tasks: [
        {
          taskName: "Task 1",
          taskDescription: "",
          stageId: "section1",
          archived: false,
          dueDate: "2025-06-10",
          taskCompletedAt: null,
          assignedLabels: [
            {
              labelId: "tag1",
              labelName: "Important",
              color: DEFAULT_IMPORT_LABEL_COLOR,
            },
            {
              labelId: "tag2",
              labelName: "Bug",
              color: DEFAULT_IMPORT_LABEL_COLOR,
            },
          ],
        },
        {
          taskName: "Task 2",
          taskDescription: "",
          stageId: "section2",
          archived: true,
          dueDate: "2025-06-08T23:59:59.000Z",
          taskCompletedAt: "2025-06-05T14:30:00.000Z",
          assignedLabels: [
            {
              labelId: "tag2",
              labelName: "Bug",
              color: DEFAULT_IMPORT_LABEL_COLOR,
            },
          ],
        },
        {
          taskName: "Task 3",
          taskDescription: "",
          stageId: "section1",
          archived: false,
          dueDate: null,
          taskCompletedAt: null,
          assignedLabels: [],
        },
      ],
      labels: [
        {
          labelId: "tag1",
          labelName: "Important",
          color: DEFAULT_IMPORT_LABEL_COLOR,
        },
        {
          labelId: "tag2",
          labelName: "Bug",
          color: DEFAULT_IMPORT_LABEL_COLOR,
        },
      ],
    };

    const result = normalizeAsanaImport(asanaData);
    expect(result).toEqual(expectedResult);
  });

  it("should handle empty Asana import data", () => {
    const asanaData: AsanaImport = {
      data: [],
    };

    const expectedResult: WPQTImport = {
      pipelineName: "",
      pipelineDescription: "",
      stages: [],
      tasks: [],
      labels: [],
    };

    const result = normalizeAsanaImport(asanaData);
    expect(result).toEqual(expectedResult);
  });

  it("should prioritize due_at over due_on when both are present", () => {
    const asanaData: AsanaImport = {
      data: [
        {
          gid: "task1",
          name: "Task with both due dates",
          completed: false,
          completed_at: null,
          due_on: "2025-06-10",
          due_at: "2025-06-10T15:30:00.000Z",
          tags: [],
          projects: [
            {
              gid: "project1",
              name: "Project",
            },
          ],
          memberships: [
            {
              project: {
                gid: "project1",
                name: "Project",
              },
              section: {
                gid: "section1",
                name: "To Do",
              },
            },
          ],
        },
      ],
    };

    const result = normalizeAsanaImport(asanaData);
    expect(result.tasks[0].dueDate).toBe("2025-06-10T15:30:00.000Z");
  });

  it("should fall back to due_on when due_at is null", () => {
    const asanaData: AsanaImport = {
      data: [
        {
          gid: "task1",
          name: "Task with only due_on",
          completed: false,
          completed_at: null,
          due_on: "2025-06-10",
          due_at: null,
          tags: [],
          projects: [
            {
              gid: "project1",
              name: "Project",
            },
          ],
          memberships: [
            {
              project: {
                gid: "project1",
                name: "Project",
              },
              section: {
                gid: "section1",
                name: "To Do",
              },
            },
          ],
        },
      ],
    };

    const result = normalizeAsanaImport(asanaData);
    expect(result.tasks[0].dueDate).toBe("2025-06-10");
  });

  it("should correctly assign tasks to default stage when no membership exists", () => {
    const asanaData: AsanaImport = {
      data: [
        {
          gid: "task1",
          name: "Task with membership",
          completed: false,
          completed_at: null,
          due_on: null,
          due_at: null,
          tags: [],
          projects: [
            {
              gid: "project1",
              name: "Project",
            },
          ],
          memberships: [
            {
              project: {
                gid: "project1",
                name: "Project",
              },
              section: {
                gid: "section1",
                name: "To Do",
              },
            },
          ],
        },
        {
          gid: "task2",
          name: "Task without proper membership",
          completed: false,
          completed_at: null,
          due_on: null,
          due_at: null,
          tags: [],
          projects: [
            {
              gid: "project1",
              name: "Project",
            },
          ],
          memberships: [
            {
              project: {
                gid: "project2", // Different project
                name: "Another Project",
              },
              section: {
                gid: "section2",
                name: "Another Section",
              },
            },
          ],
        },
      ],
    };

    const result = normalizeAsanaImport(asanaData);
    // Task with membership should be in its section
    expect(result.tasks[0].stageId).toBe("section1");
    // Task without proper membership should be in the first available stage
    expect(result.tasks[1].stageId).toBe("section1");
  });

  it("should handle Asana tags (labels) correctly", () => {
    const asanaData: AsanaImport = {
      data: [
        {
          gid: "task1",
          name: "Task with tags",
          completed: false,
          completed_at: null,
          due_on: null,
          due_at: null,
          tags: [
            {
              gid: "tag1",
              name: "Important",
            },
            {
              gid: "tag2",
              name: "Bug",
            },
          ],
          projects: [
            {
              gid: "project1",
              name: "Project",
            },
          ],
          memberships: [
            {
              project: {
                gid: "project1",
                name: "Project",
              },
              section: {
                gid: "section1",
                name: "To Do",
              },
            },
          ],
        },
        {
          gid: "task2",
          name: "Task with different tag",
          completed: false,
          completed_at: null,
          due_on: null,
          due_at: null,
          tags: [
            {
              gid: "tag3",
              name: "Feature",
            },
          ],
          projects: [
            {
              gid: "project1",
              name: "Project",
            },
          ],
          memberships: [
            {
              project: {
                gid: "project1",
                name: "Project",
              },
              section: {
                gid: "section1",
                name: "To Do",
              },
            },
          ],
        },
      ],
    };

    const result = normalizeAsanaImport(asanaData);

    // Should have 3 unique labels
    expect(result.labels.length).toBe(3);

    // First task should have 2 labels
    expect(result.tasks[0].assignedLabels.length).toBe(2);
    expect(result.tasks[0].assignedLabels[0].labelName).toBe("Important");
    expect(result.tasks[0].assignedLabels[1].labelName).toBe("Bug");

    // Second task should have 1 label
    expect(result.tasks[1].assignedLabels.length).toBe(1);
    expect(result.tasks[1].assignedLabels[0].labelName).toBe("Feature");

    // All labels should use the default color
    result.labels.forEach((label) => {
      expect(label.color).toBe(DEFAULT_IMPORT_LABEL_COLOR);
    });
  });
});
