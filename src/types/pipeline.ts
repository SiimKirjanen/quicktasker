import { Stage } from "./stage";

type Pipeline = {
  id: string;
  name: string;
  description?: string;
  stages: Stage[];
};

export type { Pipeline };
