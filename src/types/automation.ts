import { User, WPUser } from "./user";

enum AutomationTrigger {
  TASK_DONE = "task-done",
  Task_NOT_DONE = "task-not-done",
  TASK_CREATED = "task-created",
}

enum TargetType {
  PIPELINE = "pipeline",
  Stage = "stage",
  Task = "task",
  quicktasker = "quicktasker",
}

enum ActionTargetType {
  PIPELINE = "pipeline",
  STAGE = "stage",
  TASK = "task",
  QUICKTASKER = "quicktasker",
  WP_USER = "wp-user",
}

enum AutomationAction {
  ARCHIVE_TASK = "archive-task",
  ASSIGN_USER = "assign-user",
  NEW_ENTITY_EMAIL = "new-entity-email",
}

type AutomationActionType = {
  id: AutomationAction;
  requireAutomationTarget?: boolean;
  requireAutomationTargetType?: boolean;
  requireMetaData?: boolean;
};

type AutomationExecutionResult = boolean | WPUser | User;

type Automation = {
  id: string;
  pipeline_id: string;
  target_id: string | null;
  target_type: TargetType;
  automation_trigger: AutomationTrigger;
  automation_action: AutomationAction;
  automation_action_target_id: string | null;
  automation_action_target_type: ActionTargetType;
  created_at: string;
  updated_at: string;
  metadata: string | null;
};

type ExecutedAutomation = Automation & {
  executionResult?: AutomationExecutionResult;
};

export {
  ActionTargetType,
  AutomationAction,
  AutomationTrigger,
  TargetType,
  type Automation,
  type AutomationActionType,
  type AutomationExecutionResult,
  type ExecutedAutomation,
};
