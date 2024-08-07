import apiFetch from "@wordpress/api-fetch";

function getPipelineData(pipelineId: string) {
  return apiFetch({ path: `/wpqt/v1/pipeline/${pipelineId}` });
}

export { getPipelineData };
