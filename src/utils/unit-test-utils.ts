import { Pipeline } from "../types/pipeline";
import { Task } from "../types/task";

const dummyTask: Task = {
  id: "task1",
  pipeline_id: "pipeline_1",
  pipeline_name: "Pipeline 1",
  stage_id: "stage_1",
  name: "Task 1",
  description: "Description of Task 1",
  is_done: false,
  task_hash: "hash_1",
  created_at: "2023-01-01T00:00:00Z",
  task_order: 1,
  free_for_all: false,
  assigned_users: [],
  assigned_wp_users: [],
  is_archived: false,
  assigned_labels: [],
  due_date: null,
  task_focus_color: null,
};

const dummyFullPipeline: Pipeline = {
  id: "pipeline_1",
  name: "Pipeline 1",
  description: "Description of Pipeline 1",
  is_primary: true,
  stages: [
    {
      id: "stage_1",
      name: "Stage 1",
      pipeline_id: "pipeline_1",
      description: "Description of Stage 1",
      tasks: [dummyTask],
      stage_order: 0,
    },
  ],
};

export { dummyFullPipeline, dummyTask };
