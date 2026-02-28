import { ApiToken, ApiTokenFromServer } from "../types/api-token";

const converApiTokenFromServer = (apiToken: ApiTokenFromServer): ApiToken => ({
  ...apiToken,
  get_pipeline: apiToken.get_pipeline === "1",
  patch_pipeline: apiToken.patch_pipeline === "1",
  get_pipeline_stages: apiToken.get_pipeline_stages === "1",
  post_pipeline_stages: apiToken.post_pipeline_stages === "1",
  patch_pipeline_stages: apiToken.patch_pipeline_stages === "1",
  delete_pipeline_stages: apiToken.delete_pipeline_stages === "1",
  get_pipeline_tasks: apiToken.get_pipeline_tasks === "1",
  post_pipeline_tasks: apiToken.post_pipeline_tasks === "1",
  patch_pipeline_tasks: apiToken.patch_pipeline_tasks === "1",
  delete_pipeline_tasks: apiToken.delete_pipeline_tasks === "1",
});

const convertApiTokensFromServer = (
  apiTokens: ApiTokenFromServer[],
): ApiToken[] => {
  return apiTokens.map(converApiTokenFromServer);
};

export { converApiTokenFromServer, convertApiTokensFromServer };
