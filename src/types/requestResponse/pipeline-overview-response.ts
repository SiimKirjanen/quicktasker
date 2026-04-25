type PipelineOverviewResponse = {
  stages: {
    id: string;
    name: string;
    tasksCount: string;
  }[];
  archivedTasksCount: string;
  notArchivedTasksCount: string;
  doneTasksCount: string;
  notDoneTasksCount: string;
  overdueTasksCount: string;
  totalTasksCount: string;
};

export type { PipelineOverviewResponse };
