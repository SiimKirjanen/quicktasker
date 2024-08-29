import { Pipeline } from "./pipeline";
import { User } from "./user";

declare global {
  interface Window {
    wpqt: {
      initialActivePipelineId: string;
      initialPipelines: Pipeline[];
      apiNonce: string;
      initialUsers: User[];
    };
  }
}
