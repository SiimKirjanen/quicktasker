import { NotificationTypePreferences } from "./notification";
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
      isPluginAdmin: "1" | "0";
      isUserAllowedToDelete: "1" | "0";
      isUserAllowedToManageSettings: "1" | "0";
      userPageCustomStyles: string;
      taskUploadsURL: string;
      initialNotificationPreferences: {
        filter: string;
        max_age_hours: number;
        selected_pipeline_ids: number[] | null;
        notification_types: NotificationTypePreferences;
      };
    };
  }
}

export {};
