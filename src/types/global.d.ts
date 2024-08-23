import { Pipeline } from "./pipeline";

declare global {
  interface Window {
    wpqt: {
      initialActivePipelineId: string;
      apiNonce: string;
    };
  }
}
