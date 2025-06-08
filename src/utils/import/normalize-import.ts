import { DEFAULT_IMPORT_LABEL_COLOR } from "../../constants";
import {
  AsanaImport,
  AsanaImportLabel,
  AsanaImportSection,
  TrelloImport,
  WPQTImport,
} from "../../types/imports";

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

function normalizeAsanaImport(importData: AsanaImport): WPQTImport {
  if (!importData.data || importData.data.length === 0) {
    return {
      pipelineName: "",
      pipelineDescription: "",
      stages: [],
      tasks: [],
      labels: [],
    };
  }
  const primaryProjectGid = importData.data[0].projects[0].gid;
  const primaryProjectName = importData.data[0].projects[0].name;
  const sectionsMap = new Map<string, AsanaImportSection>();
  const tagsMap = new Map<string, AsanaImportLabel>();

  importData.data.forEach((task) => {
    task.memberships.forEach((membership) => {
      if (membership.project.gid === primaryProjectGid) {
        const section = membership.section;

        if (!sectionsMap.has(section.gid)) {
          sectionsMap.set(section.gid, section);
        }
      }
    });
    task.tags.forEach((tag) => {
      if (!tagsMap.has(tag.gid)) {
        tagsMap.set(tag.gid, tag);
      }
    });
  });
  const stages = Array.from(sectionsMap.values()).map((section) => ({
    stageId: section.gid,
    stageName: section.name,
    stageDescription: "",
  }));
  const labels = Array.from(tagsMap.values()).map((tag) => ({
    labelId: tag.gid,
    labelName: tag.name || "",
    color: DEFAULT_IMPORT_LABEL_COLOR,
  }));

  const tasks = importData.data.map((task) => {
    // Find the section for this task within the primary project
    const membership = task.memberships.find(
      (m) => m.project.gid === primaryProjectGid,
    );

    // Set the stage ID or use a default if not found
    const stageId = membership?.section.gid || stages[0]?.stageId || "";

    return {
      taskName: task.name,
      taskDescription: "",
      stageId: stageId,
      archived: task.completed,
      dueDate: task.due_at || task.due_on || null,
      taskCompletedAt: task.completed_at || null,
      assignedLabels: task.tags.map((tag) => ({
        labelName: tag.name,
        labelId: tag.gid,
        color: DEFAULT_IMPORT_LABEL_COLOR,
      })),
    };
  });

  return {
    pipelineName: primaryProjectName,
    pipelineDescription: "",
    stages,
    tasks,
    labels,
  };
}

export { normalizeAsanaImport, normalizeTrelloImport };
