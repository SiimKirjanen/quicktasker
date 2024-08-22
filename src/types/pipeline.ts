import { Stage } from "./stage";

type Pipeline = {
  id: string;
  name: string;
  description?: string;
  stages: Stage[];
  is_primary: boolean;
};

export type { Pipeline };
