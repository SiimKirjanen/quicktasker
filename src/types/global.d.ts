import { Pipeline } from "./pipeline";

declare global {
  interface Window {
    wpqt: {
      initialActivePipelineId: string;
      initialPipelines: Pipeline[];
      apiNonce: string;
    };
  }
}
