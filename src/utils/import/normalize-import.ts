import { DEFAULT_IMPORT_LABEL_COLOR } from "../../constants";
import {
  AsanaImport,
  AsanaImportLabel,
  AsanaImportSection,
  PipedriveImport,
  TrelloImport,
  WPQTImport,
  WPQTLabelImport,
} from "../../types/imports";
import { generateUUID } from "../uuid";

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

function normalizePipedriveImport(importData: PipedriveImport): WPQTImport {
  if (!importData) {
    return {
      pipelineName: "",
      pipelineDescription: "",
      stages: [],
      tasks: [],
      labels: [],
    };
  }

  const stagesMap = new Map<
    string,
    {
      stageId: string;
      stageName: string;
    }
  >();
  const labelsMap = new Map<
    string,
    {
      labelId: string;
      labelName: string;
      color: string;
    }
  >();

  importData.deals.forEach((deal) => {
    if (deal.stage && !stagesMap.has(deal.stage)) {
      stagesMap.set(deal.stage, {
        stageId: generateUUID(),
        stageName: deal.stage,
      });
    }
    if (deal.label) {
      const labels = deal.label
        .split(",")
        .map((label) => label.trim())
        .filter(Boolean);

      labels.forEach((labelName) => {
        if (labelName && !labelsMap.has(labelName)) {
          labelsMap.set(labelName, {
            labelId: generateUUID(),
            labelName: labelName,
            color: DEFAULT_IMPORT_LABEL_COLOR,
          });
        }
      });
    }
  });

  const stages = Array.from(stagesMap.values()).map((stage) => ({
    stageId: stage.stageId,
    stageName: stage.stageName,
    stageDescription: "",
  }));

  const tasks = importData.deals.map((deal) => {
    const stageInfo = stagesMap.get(deal.stage);
    const dealStatus = deal.status.toLocaleLowerCase();
    const taskLabels: WPQTLabelImport[] = [];

    if (deal.label) {
      const labels = deal.label
        .split(",")
        .map((label) => label.trim())
        .filter(Boolean);

      labels.forEach((labelName) => {
        const labelInfo = labelsMap.get(labelName);

        if (labelInfo) {
          taskLabels.push({
            labelId: labelInfo.labelId,
            labelName: labelInfo.labelName,
            color: labelInfo.color,
          });
        }
      });
    }

    return {
      taskName: deal.title,
      taskDescription: "",
      stageId: stageInfo ? stageInfo.stageId : stages[0]?.stageId || "",
      archived: dealStatus === "lost" || dealStatus === "deleted",
      assignedLabels: taskLabels,
      dueDate: deal.expected_close_date || null,
      taskCompletedAt:
        dealStatus === "won" ? deal.deal_closed_on || null : null,
    };
  });

  return {
    pipelineName: importData.pipelineName,
    pipelineDescription: "",
    stages,
    tasks: tasks,
    labels: [],
  };
}

export {
  normalizeAsanaImport,
  normalizePipedriveImport,
  normalizeTrelloImport,
};
