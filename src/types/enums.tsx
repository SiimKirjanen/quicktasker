enum WPQTTypes {
  Task = "task",
  User = "user",
}

enum WPQTLogCreatedBy {
  System = "system",
  Admin = "admin",
  WPQTUser = "quicktasker_user",
  Automation = "automation",
}

enum WPQTArchiveDoneFilter {
  All = "all",
  Completed = "completed",
  NotCompleted = "not completed",
}

enum WPQTWpUserTypes {
  Admin = "administrator",
  Other = "other",
}

export { WPQTArchiveDoneFilter, WPQTLogCreatedBy, WPQTTypes, WPQTWpUserTypes };
