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
  Webhook = "webhook",
}

enum WPQTArchiveDoneFilter {
  All = "",
  Completed = "1",
  NotCompleted = "0",
}

enum WPQTWpUserTypes {
  Admin = "administrator",
  Other = "other",
}

enum WPQTArvhiveTaskLimit {
  ALL = "",
  ONE_HUNDRED = "100",
  TWO_HUNDRED = "200",
  FIVE_HUNDRED = "500",
}

enum WPQTArchiveOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export {
  WPQTArchiveDoneFilter,
  WPQTArchiveOrder,
  WPQTArvhiveTaskLimit,
  WPQTLogCreatedBy,
  WPQTTypes,
  WPQTWpUserTypes,
};
