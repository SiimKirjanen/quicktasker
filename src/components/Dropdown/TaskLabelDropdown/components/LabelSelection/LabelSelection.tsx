import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { Label, SelectionLabel } from "../../../../../types/label";
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
  if (!labels) {
    return null;
  }
  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
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
      <WPQTButton btnText={__("Add new label", "quicktasker")} />
    </div>
  );
}

type SelectionLabelProps = {
  label: Label;
  labelSelected: (labelId: string) => void;
  labelDeSelection: (labelId: string) => void;
};
function SelectionLabel({
  label,
  labelSelected,
  labelDeSelection,
}: SelectionLabelProps) {
  return (
    <div className="wpqt-flex wpqt-gap-1">
      <input type="checkbox" />
      <div>{label.name}</div>
      <PencilSquareIcon className="wpqt-text-5 wpqt-icon-green" />
    </div>
  );
}

export { LabelSelection };
