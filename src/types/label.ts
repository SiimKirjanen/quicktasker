type Label = {
  id: string;
  pipeline_id: string;
  name: string;
  color: string;
  created_at: string;
};

type SelectionLabel = Label & {
  selected: boolean;
};

enum LabelActionState {
  SELECTION = "select",
  CREATION = "create",
  EDIT = "edit",
}

export { LabelActionState };
export type { Label, SelectionLabel };
