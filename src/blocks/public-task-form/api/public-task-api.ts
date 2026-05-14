import apiFetch from "@wordpress/api-fetch";
import type {
  BoardStatus,
  CreateTaskResponse,
  TaskStatusData,
  WPQTResponse,
} from "../types";

export function getPipelineStatusRequest(
  pipelineId: number,
): Promise<WPQTResponse<BoardStatus>> {
  return apiFetch({
    path: `/wpqt/v1/public/pipelines/${pipelineId}/status`,
    method: "GET",
  });
}

export function getTaskStatusesRequest(
  hashes: string[],
): Promise<WPQTResponse<Record<string, TaskStatusData>>> {
  return apiFetch({
    path: "/wpqt/v1/public/tasks/statuses",
    method: "POST",
    data: { hashes },
  });
}

export function createPublicTaskRequest(data: {
  pipeline_id: number;
  name: string;
  description: string;
}): Promise<WPQTResponse<CreateTaskResponse>> {
  return apiFetch({
    path: "/wpqt/v1/public/tasks",
    method: "POST",
    data,
  });
}
