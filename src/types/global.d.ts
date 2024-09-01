import { Pipeline } from "./pipeline";
import { ServerUser, User } from "./user";

declare global {
  interface Window {
    wpqt: {
      initialActivePipelineId: string;
      initialPipelines: Pipeline[];
      apiNonce: string;
      initialUsers: ServerUser[];
      siteURL: string;
      publicUserPageId: string;
    };
  }
}
