import { TrelloImport, WPQTImport } from "../../../types/imports";
import { normalizeTrelloImport } from "../../../utils/import/normalize-import";

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
