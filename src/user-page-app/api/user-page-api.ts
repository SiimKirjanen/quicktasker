import apiFetch from "@wordpress/api-fetch";
import { WPQTResponse } from "../../types/response";
import { ServerUserPageStatus } from "../types/user-page-status";
import { UserSession } from "../types/user-session";
import { UserPageOverview } from "../types/user-page-overview";

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
): Promise<WPQTResponse<UserSession>> {
  return apiFetch({
    path: `/wpqt/v1/user-page/${pageHash}/login`,
    method: "POST",
    data: { password },
  });
}

function getOverviewRequest(): Promise<WPQTResponse<UserPageOverview>> {
  return apiFetch({
    method: "GET",
    path: `/wpqt/v1/user-page/overview`,
  });
}

export {
  getUserPageStatusRequest,
  setUpUserPageRequest,
  logInUserPageRequest,
  getOverviewRequest,
};
