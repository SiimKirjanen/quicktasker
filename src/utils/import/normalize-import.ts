import { TrelloImport, WPQTImport } from "../../types/imports";

function normalizeTrelloImport(importData: TrelloImport): WPQTImport {
  const pipelineData = {
    pipelineName: importData.name,
    pipelineDescription: importData.desc,
    stages: importData.lists
      .filter((list) => !list.closed)
      .map((list) => ({
        stageName: list.name,
        stageDescription: "",
        stageId: list.id,
      })),
    tasks: importData.cards.map((card) => {
      return {
        taskName: card.name,
        taskDescription: "",
        stageId: card.idList,
        archived: card.closed,
        assignedLabels: card.labels.map((label) => ({
          labelName: label.name,
          labelId: label.id,
          color: label.color,
        })),
        dueDate: card.due ? card.due : null,
        taskCompletedAt: card.dateCompleted ? card.dateCompleted : null,
      };
    }),
    labels: importData.labels.map((label) => ({
      labelName: label.name,
      labelId: label.id,
      color: label.color,
    })),
  };

  return pipelineData;
}

export { normalizeTrelloImport };
