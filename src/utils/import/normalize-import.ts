import { DEFAULT_IMPORT_LABEL_COLOR } from "../../constants";
import {
  AsanaImport,
  AsanaImportLabel,
  AsanaImportSection,
  PipedriveDealImport,
  TrelloImport,
  WPQTImport,
  WPQTLabelImport,
  WPQTSourcePipeline,
  WPQTStageImport,
} from "../../types/imports";
import { generateUUID } from "../uuid";

const EMPTY_IMPORT: WPQTImport = {
  pipelineName: "",
  pipelineDescription: "",
  stages: [],
  tasks: [],
  labels: [],
  sourcePipelines: [],
  taskComments: [],
};

function normalizeTrelloImport(importData: TrelloImport): WPQTImport {
  const sourcePipelines: WPQTSourcePipeline[] = [
    {
      name: importData.name,
      id: importData.id,
    },
  ];

  const pipelineData = {
    pipelineName: importData.name,
    pipelineDescription: importData.desc,
    stages: importData.lists
      .filter((list) => !list.closed)
      .map((list) => ({
        stageName: list.name,
        stageDescription: "",
        stageId: list.id,
        sourcePipeline: {
          name: importData.name,
          id: importData.id,
        },
      })),
    tasks: importData.cards.map((card) => {
      return {
        taskId: card.id,
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
        taskFocusColor: card.cover?.color ?? null,
        sourcePipeline: {
          name: importData.name,
          id: importData.id,
        },
      };
    }),
    labels: importData.labels.map((label) => ({
      labelName: label.name,
      labelId: label.id,
      color: label.color,
    })),
    sourcePipelines,
    taskComments: [],
  };

  return pipelineData;
}

function normalizeAsanaImport(importData: AsanaImport): WPQTImport {
  if (!importData.data || importData.data.length === 0) {
    return {
      ...EMPTY_IMPORT,
    };
  }

  const primaryProjectGid = importData.data[0].projects[0].gid;
  const primaryProjectName = importData.data[0].projects[0].name;
  const sectionsMap = new Map<string, AsanaImportSection>();
  const tagsMap = new Map<string, AsanaImportLabel>();
  const sourcePipelines: WPQTSourcePipeline[] = [
    {
      name: primaryProjectName,
      id: primaryProjectGid,
    },
  ];

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
    sourcePipeline: {
      name: primaryProjectName,
      id: primaryProjectGid,
    },
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
      taskId: task.gid,
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
      taskFocusColor: null,
      sourcePipeline: {
        name: primaryProjectName,
        id: primaryProjectGid,
      },
    };
  });

  return {
    pipelineName: primaryProjectName,
    pipelineDescription: "",
    stages,
    tasks,
    labels,
    sourcePipelines,
    taskComments: [],
  };
}

function normalizePipedriveImport(
  importData: PipedriveDealImport[],
): WPQTImport {
  if (!importData) {
    return {
      ...EMPTY_IMPORT,
    };
  }

  const stagesMap = new Map<string, WPQTStageImport>();
  const labelsMap = new Map<string, WPQTLabelImport>();
  const pipelinesMap = new Map<string, WPQTSourcePipeline>();

  importData.forEach((deal) => {
    if (deal.pipeline && !pipelinesMap.has(deal.pipeline)) {
      pipelinesMap.set(deal.pipeline, {
        name: deal.pipeline,
        id: generateUUID(),
      });
    }
  });

  importData.forEach((deal) => {
    if (deal.stage && !stagesMap.has(deal.stage)) {
      stagesMap.set(deal.stage, {
        stageId: generateUUID(),
        stageName: deal.stage,
        stageDescription: "",
        sourcePipeline: pipelinesMap.get(deal.pipeline) || {
          name: "",
          id: generateUUID(),
        },
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
    sourcePipeline: {
      name: stage.sourcePipeline.name,
      id: stage.sourcePipeline.id,
    },
  }));

  const labels = Array.from(labelsMap.values()).map((label) => ({
    labelId: label.labelId,
    labelName: label.labelName,
    color: label.color,
  }));

  const pipelines: WPQTSourcePipeline[] = Array.from(pipelinesMap.values()).map(
    (pipeline) => ({
      name: pipeline.name,
      id: pipeline.id,
    }),
  );

  const tasks = importData.map((deal) => {
    const stageInfo = stagesMap.get(deal.stage);
    const dealStatus = deal.status.toLocaleLowerCase();
    const taskLabels: WPQTLabelImport[] = [];
    let taskPipeline: WPQTSourcePipeline | null = null;

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

    if (deal.pipeline) {
      const pipelineInfo = pipelinesMap.get(deal.pipeline);

      if (pipelineInfo) {
        taskPipeline = {
          name: pipelineInfo.name,
          id: pipelineInfo.id,
        };
      }
    }

    return {
      taskId: deal.id,
      taskName: deal.title,
      taskDescription: "",
      stageId: stageInfo ? stageInfo.stageId : stages[0]?.stageId || "",
      archived: dealStatus === "lost" || dealStatus === "deleted",
      assignedLabels: taskLabels,
      dueDate: deal.expected_close_date || null,
      taskFocusColor: null,
      taskCompletedAt:
        dealStatus === "won" ? deal.deal_closed_on || null : null,
      sourcePipeline: taskPipeline,
    };
  });

  return {
    pipelineName: "",
    pipelineDescription: "",
    stages,
    tasks,
    labels,
    sourcePipelines: pipelines,
    taskComments: [],
  };
}

export {
  normalizeAsanaImport,
  normalizePipedriveImport,
  normalizeTrelloImport,
};
