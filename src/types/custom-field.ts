enum CustomFieldType {
  Text = "text",
  Select = "select",
  Checkbox = "checkbox",
  Radio = "radio",
  Datetime = "datetime",
  File = "file",
}

enum CustomFieldEntityType {
  QUICKTASKER = "quicktasker",
  WP_USER = "wp-user",
  Pipeline = "pipeline",
  Users = "users",
  Task = "task",
}

type CustomField = {
  id: string;
  name: string;
  description: string;
  type: CustomFieldType;
  entity_type: CustomFieldEntityType;
  entity_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  is_deleted: string;
  value?: string | null;
  default_value: string | null;
};

type WPQTTaskCustomFieldImport = CustomField & {
  task_id: string;
  pipeline_id: string;
};

export {
  CustomFieldEntityType,
  CustomFieldType,
  type CustomField,
  type WPQTTaskCustomFieldImport,
};
