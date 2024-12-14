import { __ } from "@wordpress/i18n";
import {
  AutomationAction,
  AutomationTrigger,
  TargetType,
} from "../types/automation";

const automationActionStrings: { [key in AutomationAction]: string } = {
  [AutomationAction.ARCHIVE_TASK]: __("Archive task", "quicktasker"),
  [AutomationAction.ASSIGN_USER]: __("Assign user", "quickkasker"),
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
};

const taskAutomations = {
  [AutomationTrigger.TASK_DONE]: [AutomationAction.ARCHIVE_TASK],
  [AutomationTrigger.Task_NOT_DONE]: [AutomationAction.ARCHIVE_TASK],
  [AutomationTrigger.TASK_CREATED]: [AutomationAction.ASSIGN_USER],
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
