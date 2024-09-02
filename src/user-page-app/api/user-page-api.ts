import apiFetch from "@wordpress/api-fetch";
import { WPQTResponse } from "../../types/response";
import { ServerUserPageStatus } from "../types/user-page-status";

function getUserPageStatusRequest(
  pageHash: string,
): Promise<WPQTResponse<ServerUserPageStatus>> {
  return apiFetch({
    path: `/wpqt/v1/user-page/${pageHash}/status`,
    method: "GET",
  });
}

export { getUserPageStatusRequest };
