import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { SET_LABEL_ACTION_STATE_CREATION } from "../../../../../constants";
import { LabelContext } from "../../../../../providers/LabelsContextProvider";
import { SelectionLabel } from "../../../../../types/label";
import { WPQTButton } from "../../../../common/Button/Button";
import { Loading } from "../../../../Loading/Loading";

type Props = {
  labels: SelectionLabel[] | null;
  title: string;
  labelSelected: (labelId: string) => void;
  labelDeSelection: (labelId: string) => void;
  loading?: boolean;
};
function LabelSelection({
  labels,
  title,
  labelSelected,
  labelDeSelection,
  loading = false,
}: Props) {
  const { labelDispatch } = useContext(LabelContext);

  if (!labels) {
    return null;
  }
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-2">
      <div>{title}</div>
      {loading ? (
        <Loading ovalSize="24" />
      ) : (
        labels.map((label) => (
          <SelectionLabel
            key={label.id}
            label={label}
            labelSelected={labelSelected}
            labelDeSelection={labelDeSelection}
          />
        ))
      )}
      <WPQTButton
        btnText={__("Add new label", "quicktasker")}
        onClick={() => {
          labelDispatch({ type: SET_LABEL_ACTION_STATE_CREATION });
        }}
      />
    </div>
  );
}

type SelectionLabelProps = {
  label: SelectionLabel;
  labelSelected: (labelId: string) => void;
  labelDeSelection: (labelId: string) => void;
};
function SelectionLabel({
  label,
  labelSelected,
  labelDeSelection,
}: SelectionLabelProps) {
  return (
    <div className="wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-w-full">
      <input type="checkbox" checked={label.selected} />
      <div className="wpqt-flex-1 wpqt-text-center">{label.name}</div>
      <PencilSquareIcon className="wpqt-size-4 wpqt-icon-green" />
    </div>
  );
}

export { LabelSelection };
