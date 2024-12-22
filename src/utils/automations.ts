import { __ } from "@wordpress/i18n";
import {
  AutomationAction,
  AutomationActionType,
  AutomationTrigger,
  TargetType,
} from "../types/automation";

const automationActionStrings: { [key in AutomationAction]: string } = {
  [AutomationAction.ARCHIVE_TASK]: __("Archive task", "quicktasker"),
  [AutomationAction.ASSIGN_USER]: __("Assign user", "quickkasker"),
  [AutomationAction.NEW_ENTITY_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.DELETED_ENTITY_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.TASK_ASSIGNED_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
  [AutomationAction.TASK_UNASSIGNED_EMAIL]: __(
    "Send email notification",
    "quicktasker",
  ),
};

const automationTargetStrings: { [key in TargetType]: string } = {
  [TargetType.Task]: __("Task", "quicktasker"),
  [TargetType.Stage]: __("Stage", "quicktasker"),
  [TargetType.PIPELINE]: __("Board", "quicktasker"),
  [TargetType.quicktasker]: "Quicktasker",
};

const automationTriggerStrings: { [key in AutomationTrigger]: string } = {
  [AutomationTrigger.TASK_DONE]: __("Task marked as done", "quicktasker"),
  [AutomationTrigger.Task_NOT_DONE]: __(
    "Task marked as not done",
    "quicktasker",
  ),
  [AutomationTrigger.TASK_CREATED]: __("Task created", "quicktasker"),
  [AutomationTrigger.TASK_DELETED]: __("Task deleted", "quicktasker"),
  [AutomationTrigger.TASK_ASSIGNED]: __("Task assigned", "quicktasker"),
  [AutomationTrigger.TASK_UNASSIGNED]: __("Task unassigned", "quicktasker"),
};

const taskAutomations: { [key in AutomationTrigger]: AutomationActionType[] } =
  {
    [AutomationTrigger.TASK_DONE]: [
      {
        id: AutomationAction.ARCHIVE_TASK,
      },
    ],
    [AutomationTrigger.Task_NOT_DONE]: [
      {
        id: AutomationAction.ARCHIVE_TASK,
      },
    ],
    [AutomationTrigger.TASK_CREATED]: [
      {
        id: AutomationAction.ASSIGN_USER,
        requireAutomationTarget: true,
        requireAutomationTargetType: true,
      },
      {
        id: AutomationAction.NEW_ENTITY_EMAIL,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_DELETED]: [
      {
        id: AutomationAction.DELETED_ENTITY_EMAIL,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_ASSIGNED]: [
      {
        id: AutomationAction.TASK_ASSIGNED_EMAIL,
        requireMetaData: true,
      },
    ],
    [AutomationTrigger.TASK_UNASSIGNED]: [
      {
        id: AutomationAction.TASK_UNASSIGNED_EMAIL,
        requireMetaData: true,
      },
    ],
  };

const availableAutomations = {
  [TargetType.Task]: taskAutomations,
};

export {
  automationActionStrings,
  automationTargetStrings,
  automationTriggerStrings,
  availableAutomations,
};
