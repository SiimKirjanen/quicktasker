import { PipelineFromServer } from "./pipeline";
import { ServerUser, WPUser } from "./user";

declare global {
  interface Window {
    wpqt: {
      initialActivePipelineId: string | null;
      initialPipelines: PipelineFromServer[];
      apiNonce: string;
      initialUsers: ServerUser[];
      initialWPUsers: WPUser[];
      siteURL: string;
      pluginURL: string;
      publicUserPageId: string;
      timezone: string;
      isUserAllowedToDelete: "1" | "0";
      isUserAllowedToManageSettings: "1" | "0";
      userPageCustomStyles: string;
      taskUploadsURL: string;
    };
  }
}

export {};
