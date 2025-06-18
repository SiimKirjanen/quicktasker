import { TrelloImportList } from "../../types/imports";

/**
 * Validates if the provided data is a valid Trello import
 * @param importData The data to validate
 * @returns True if data is valid, or an error message string if invalid
 */
function validateTrelloImport(importData: unknown): true | string {
  if (!importData || typeof importData !== "object") {
    return "Import data is missing or not an object";
  }

  const data = importData as Record<string, unknown>;

  // Check for required top-level properties
  if (!data.name) return "Missing board name";
  if (!data.cards) return "Missing cards array";
  if (!data.lists) return "Missing lists array";
  if (!data.labels) return "Missing labels array";

  // Validate that cards is an array
  if (!Array.isArray(data.cards)) {
    return "Cards property is not an array";
  }

  // Validate that lists is an array
  if (!Array.isArray(data.lists)) {
    return "Lists property is not an array";
  }

  // Validate that labels is an array
  if (!Array.isArray(data.labels)) {
    return "Labels property is not an array";
  }

  // Check if any lists are not closed
  if (
    data.lists.length > 0 &&
    !data.lists.some((list: TrelloImportList) => !list.closed)
  ) {
    return "All lists are closed, at least one open list is required";
  }

  // Check that each card has required properties
  for (const card of data.cards as Array<Record<string, unknown>>) {
    if (!card.id)
      return `Card missing ID: ${JSON.stringify(card).substring(0, 100)}...`;
    if (!card.name) return `Card missing name: ${card.id}`;
    if (!card.idList) return `Card missing list ID: ${card.id}`;

    // Make sure labels is an array
    if (!Array.isArray(card.labels)) {
      return `Card labels is not an array: ${card.id}`;
    }
  }

  // Check that each list has required properties
  for (const list of data.lists as Array<Record<string, unknown>>) {
    if (!list.id)
      return `List missing ID: ${JSON.stringify(list).substring(0, 100)}...`;
    if (!list.name) return `List missing name: ${list.id}`;
    if (typeof list.closed !== "boolean")
      return `List closed status is not boolean: ${list.id}`;
  }

  // Check that each label has required properties
  for (const label of data.labels as Array<Record<string, unknown>>) {
    if (!label.id)
      return `Label missing ID: ${JSON.stringify(label).substring(0, 100)}...`;
    if (!label.name && label.name !== "")
      return `Label missing name: ${label.id}`;
    if (!label.color) return `Label missing color: ${label.id}`;
  }

  return true;
}

/**
 * Validates if the provided data is a valid Asana import
 * @param importData The data to validate
 * @returns True if data is valid, or an error message string if invalid
 */
function validateAsanaImport(importData: unknown): true | string {
  if (!importData || typeof importData !== "object") {
    return "Import data is missing or not an object";
  }

  const data = importData as Record<string, unknown>;

  // Check for required top-level structure
  if (!data.data) return "Missing data array";
  if (!Array.isArray(data.data)) return "Data property is not an array";
  if (data.data.length === 0) return "Data array is empty";

  // Check each task
  for (const task of data.data as Array<Record<string, unknown>>) {
    // Check required task properties
    if (!task.gid)
      return `Task missing GID: ${JSON.stringify(task).substring(0, 100)}...`;
    if (!task.name) return `Task missing name: ${task.gid}`;
    if (typeof task.completed !== "boolean")
      return `Task completed status is not boolean: ${task.gid}`;

    // Check that projects exists and is an array
    if (!Array.isArray(task.projects)) {
      return `Task projects is not an array: ${task.gid}`;
    }
    if (task.projects.length === 0) {
      return `Task has no projects: ${task.gid}`;
    }

    // Check that memberships exists and is an array
    if (!Array.isArray(task.memberships)) {
      return `Task memberships is not an array: ${task.gid}`;
    }

    // Check that tags exists and is an array
    if (!Array.isArray(task.tags)) {
      return `Task tags is not an array: ${task.gid}`;
    }

    // Validate project structure
    for (const project of task.projects as Array<Record<string, unknown>>) {
      if (!project.gid) return `Project missing GID in task ${task.gid}`;
      if (!project.name) return `Project missing name in task ${task.gid}`;
    }

    // Validate membership structure (if any)
    for (const membership of task.memberships as Array<
      Record<string, unknown>
    >) {
      if (!membership.project)
        return `Membership missing project in task ${task.gid}`;
      if (!membership.section)
        return `Membership missing section in task ${task.gid}`;

      const project = membership.project as Record<string, unknown>;
      const section = membership.section as Record<string, unknown>;

      if (!project.gid)
        return `Membership project missing GID in task ${task.gid}`;
      if (!project.name)
        return `Membership project missing name in task ${task.gid}`;
      if (!section.gid)
        return `Membership section missing GID in task ${task.gid}`;
      if (!section.name)
        return `Membership section missing name in task ${task.gid}`;
    }

    // Validate tag structure (if any)
    for (const tag of task.tags as Array<Record<string, unknown>>) {
      if (!tag.gid) return `Tag missing GID in task ${task.gid}`;
      if (!tag.name) return `Tag missing name in task ${task.gid}`;
    }
  }

  return true;
}

/**
 * Validates if the provided data is a valid Pipedrive import
 * @param importData The data to validate
 * @returns True if data is valid, or an error message string if invalid
 */
function validatePipedriveImport(importData: unknown): true | string {
  if (!importData || !Array.isArray(importData)) {
    return "Import data is missing or not an array";
  }

  // If no deals are found, return error message
  if (importData.length === 0) {
    return "Deals array is empty";
  }

  // Check that each deal has required properties
  for (const deal of importData as Array<Record<string, unknown>>) {
    // Required fields
    if (!deal.title)
      return `Deal missing title: ${JSON.stringify(deal).substring(0, 100)}...`;

    if (!deal.stage) return `Deal missing stage: ${deal.title || "Unknown"}`;

    if (!deal.status) return `Deal missing status: ${deal.title || "Unknown"}`;

    // Check status is valid
    const status = String(deal.status).toLowerCase();
    const validStatuses = ["open", "won", "lost", "deleted"];
    if (!validStatuses.includes(status)) {
      return `Invalid deal status: ${status} for deal: ${deal.title || "Unknown"}`;
    }

    // Type validations for optional properties
    if (
      deal.label !== undefined &&
      deal.label !== null &&
      typeof deal.label !== "string"
    ) {
      return `Deal label must be a string: ${deal.title || "Unknown"}`;
    }

    if (
      deal.expected_close_date !== undefined &&
      deal.expected_close_date !== null &&
      typeof deal.expected_close_date !== "string"
    ) {
      return `Deal expected_close_date must be a string or null: ${deal.title || "Unknown"}`;
    }

    if (
      deal.deal_closed_on !== undefined &&
      deal.deal_closed_on !== null &&
      typeof deal.deal_closed_on !== "string"
    ) {
      return `Deal deal_closed_on must be a string or null: ${deal.title || "Unknown"}`;
    }
  }

  // Check for at least one unique stage
  const uniqueStages = new Set<string>();
  for (const deal of importData as Array<Record<string, unknown>>) {
    if (deal.stage && typeof deal.stage === "string") {
      uniqueStages.add(deal.stage as string);
    }
  }

  if (uniqueStages.size === 0) {
    return "No valid stages found in deals";
  }

  return true;
}

/**
 * Validates a QuickTasker JSON import
 *
 * @param importData The parsed JSON data to validate
 * @returns true if valid, error message string if invalid
 */
function validateQuicktaskerImport(importData: unknown): true | string {
  if (!importData || typeof importData !== "object") {
    return "Invalid import data: Not a valid object";
  }

  const data = importData as Record<string, unknown>;

  if (!data.pipelineName) {
    return "Pipeline name is required";
  }

  // Validate stages
  if (!Array.isArray(data.stages)) {
    return "Stages must be an array";
  }

  for (let i = 0; i < data.stages.length; i++) {
    const stage = data.stages[i];

    if (
      !stage.stageName ||
      typeof stage.stageName !== "string" ||
      !stage.stageName.trim()
    ) {
      return `Stage #${i + 1} is missing a name`;
    }

    if (stage.stageId === undefined || stage.stageId === null) {
      return `Stage #${i + 1} is missing an ID`;
    }
  }

  if (data.tasks && Array.isArray(data.tasks)) {
    for (let i = 0; i < data.tasks.length; i++) {
      const task = data.tasks[i];

      if (
        !task.taskName ||
        typeof task.taskName !== "string" ||
        !task.taskName.trim()
      ) {
        return `Task #${i + 1} is missing a name`;
      }

      if (task.stageId === undefined || task.stageId === null) {
        return `Task #${i + 1} is missing a stage ID`;
      }

      // Validate that referenced stage exists
      const stageExists = data.stages.some(
        (stage: { stageId: unknown }) => stage.stageId == task.stageId,
      );

      if (!stageExists) {
        return `Task "${task.taskName}" references a stage ID that does not exist in the import data`;
      }

      // Validate assigned labels if present
      if (task.assignedLabels && Array.isArray(task.assignedLabels)) {
        for (let j = 0; j < task.assignedLabels.length; j++) {
          const label = task.assignedLabels[j];

          if (
            label.labelId === undefined ||
            label.labelId === null ||
            !label.labelName
          ) {
            return `Task "${task.taskName}" has an invalid label at position ${j + 1}`;
          }
        }
      }
    }
  }

  // Validate labels (optional but must be well-formed if present)
  if (data.labels && Array.isArray(data.labels)) {
    for (let i = 0; i < data.labels.length; i++) {
      const label = data.labels[i];

      if (
        !label.labelName ||
        typeof label.labelName !== "string" ||
        !label.labelName.trim()
      ) {
        return `Label #${i + 1} is missing a name`;
      }

      if (label.labelId === undefined || label.labelId === null) {
        return `Label #${i + 1} is missing an ID`;
      }

      if (
        !label.color ||
        typeof label.color !== "string" ||
        !label.color.trim()
      ) {
        return `Label "${label.labelName || i + 1}" is missing a color`;
      }
    }
  }

  return true;
}
export {
  validateAsanaImport,
  validatePipedriveImport,
  validateQuicktaskerImport,
  validateTrelloImport,
};
