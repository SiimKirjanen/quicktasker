import { Pipeline } from "./pipeline";

declare global {
  interface Window {
    wpqt: {
      initialFullPipeline: Pipeline;
      apiNonce: string;
      existingPipelines: Pipeline[];
    };
  }
}
