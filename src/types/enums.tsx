enum WPQTTypes {
  Task = "task",
  User = "user",
}

enum WPQTLogCreatedBy {
  System = "system",
  Admin = "admin",
  WPQTUser = "quicktasker_user",
  Automation = "automation",
  Import = "import",
}

enum WPQTArchiveDoneFilter {
  All = "all",
  Completed = "completed",
  NotCompleted = "not_completed",
}

enum WPQTWpUserTypes {
  Admin = "administrator",
  Other = "other",
}

enum WPQTArvhiveTaskLimit {
  ALL = "all",
  ONE_HUNDRED = "100",
  TWO_HUNDRED = "200",
  FIVE_HUNDRED = "500",
}

export {
  WPQTArchiveDoneFilter,
  WPQTArvhiveTaskLimit,
  WPQTLogCreatedBy,
  WPQTTypes,
  WPQTWpUserTypes,
};
