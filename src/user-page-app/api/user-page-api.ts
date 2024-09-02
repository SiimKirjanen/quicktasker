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

function setUpUserPageRequest(
  pageHash: string,
  data: { password: string },
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/user-page/${pageHash}/setup`,
    data,
    method: "POST",
  });
}

function logInUserPageRequest(
  pageHash: string,
  password: string,
): Promise<WPQTResponse> {
  return apiFetch({
    path: `/wpqt/v1/user-page/${pageHash}/login`,
    method: "POST",
    data: { password },
  });
}

export { getUserPageStatusRequest, setUpUserPageRequest, logInUserPageRequest };
