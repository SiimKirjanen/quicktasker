enum AutomationTrigger {
  TASK_DONE = "task-done",
  Task_NOT_DONE = "task-not-done",
}

enum TargetType {
  PIPELINE = "pipeline",
  Stage = "stage",
  Task = "task",
  quicktasker = "quicktasker",
}

enum AutomationAction {
  ARCHIVE_TASK = "archive-task",
}

type Automation = {
  id: string;
  pipeline_id: string;
  target_id: string | null;
  target_type: TargetType;
  automation_trigger: AutomationTrigger;
  automation_action: AutomationAction;
  created_at: string;
  updated_at: string;
};

export { AutomationAction, AutomationTrigger, TargetType, type Automation };
