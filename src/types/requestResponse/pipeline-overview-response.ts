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
};

export type { PipelineOverviewResponse };
