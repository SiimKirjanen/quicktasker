import { PipelineFromServer } from "./pipeline";
import { ServerUser } from "./user";

declare global {
  interface Window {
    wpqt: {
      initialActivePipelineId: string;
      initialPipelines: PipelineFromServer[];
      apiNonce: string;
      initialUsers: ServerUser[];
      siteURL: string;
      publicUserPageId: string;
    };
  }
}

export {};
