enum UploadEntityType {
  TASK = "task",
}

type Upload = {
  id: string;
  file_name: string;
  file_type: string;
  upload_uuid: string;
  entity_id: string;
  entity_type: UploadEntityType;
  created_at: string;
};

export { UploadEntityType, type Upload };
