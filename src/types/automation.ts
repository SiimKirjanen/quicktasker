import { User, WPUser } from "./user";

enum AutomationTrigger {
  TASK_DONE = "task-done",
  Task_NOT_DONE = "task-not-done",
  TASK_CREATED = "task-created",
  TASK_DELETED = "task-deleted",
  TASK_ASSIGNED = "task-assigned",
  TASK_UNASSIGNED = "task-unassigned",
  TASK_PUBLIC_COMMENT_ADDED = "task-public-comment-added",
  TASK_PRIVATE_COMMENT_ADDED = "task-private-comment-added",
  TASK_FILE_UPLOADED = "task-attachment-added",
  TASK_FILE_DELETED = "task-attachment-deleted",
}

enum WoocommerceOrderAutomationTrigger {
  WOOCOMMERCE_ORDER_ADDED = "woocommerce-order-added",
}

enum TargetType {
  PIPELINE = "pipeline",
  Stage = "stage",
  Task = "task",
  quicktasker = "quicktasker",
  WOOCOMMERCE_ORDER = "woocommerce-order",
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
  DELETED_ENTITY_EMAIL = "deleted-entity-email",
  TASK_ASSIGNED_EMAIL = "task-assigned-email",
  TASK_UNASSIGNED_EMAIL = "task-unassigned-email",
  TASK_PUBLIC_COMMENT_ADDED_EMAIL = "task-public-comment-added-email",
  TASK_PRIVATE_COMMENT_ADDED_EMAIL = "task-private-comment-added-email",
  TASK_FILE_UPLOADED_EMAIL = "task-attachment-added-email",
  TASK_FILE_DELETED_EMAIL = "task-attachment-deleted-email",
  CREATE_TASK = "create-task",
}

type AllAutomationTriggers =
  | AutomationTrigger
  | WoocommerceOrderAutomationTrigger;

type AutomationActionType = {
  id: AutomationAction;
  requireAutomationTarget?: boolean;
  requireAutomationTargetType?: boolean;
  requireMetaData?: boolean;
};

type AutomationExecutionResult = boolean | WPUser | User;

type BaseAutomation = {
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

type Automation = BaseAutomation & {
  active: boolean;
};

type AutomationFromServer = BaseAutomation & {
  active: string;
};

type ExecutedAutomation = Automation & {
  executionResult?: AutomationExecutionResult;
};

export {
  ActionTargetType,
  AutomationAction,
  AutomationTrigger,
  TargetType,
  WoocommerceOrderAutomationTrigger,
  type AllAutomationTriggers,
  type Automation,
  type AutomationActionType,
  type AutomationExecutionResult,
  type AutomationFromServer,
  type ExecutedAutomation,
};
