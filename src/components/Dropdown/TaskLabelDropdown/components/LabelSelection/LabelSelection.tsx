import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  SET_LABEL_ACTION_STATE_CREATION,
  SET_LABEL_ACTION_STATE_EDITING,
} from "../../../../../constants";
import { LabelContext } from "../../../../../providers/LabelsContextProvider";
import { SelectionLabel } from "../../../../../types/label";
import { ButtonStyleType, WPQTButton } from "../../../../common/Button/Button";
import { WPQTTag } from "../../../../common/Tag/Tag";
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
    <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-4">
      <div className="wpqt-text-lg">{title}</div>
      {loading ? (
        <Loading ovalSize="24" />
      ) : labels.length === 0 ? (
        <div className="wpqt-text-gray-500">
          {__("There are no labels created for this board", "quicktasker")}
        </div>
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
        btnText={__("Create new label", "quicktasker")}
        className="wpqt-mt-3"
        buttonStyleType={ButtonStyleType.SECONDARY}
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
  const { labelDispatch } = useContext(LabelContext);
  const [isSelected, setIsSelected] = useState(label.selected);

  const onSelectionToggle = async (
    element: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isSelected = element.target.checked;

    setIsSelected(isSelected);
    if (isSelected) {
      labelSelected(label.id);
    } else {
      labelDeSelection(label.id);
    }
  };

  return (
    <div className="wpqt-flex wpqt-items-center wpqt-justify-between wpqt-gap-2 wpqt-w-full">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={onSelectionToggle}
      />
      <WPQTTag inlineStyle={{ backgroundColor: label.color }}>
        {label.name}
      </WPQTTag>
      <PencilSquareIcon
        className="wpqt-size-5 wpqt-icon-green wpqt-cursor-pointer"
        onClick={() => {
          labelDispatch({
            type: SET_LABEL_ACTION_STATE_EDITING,
            payload: label,
          });
        }}
      />
    </div>
  );
}

export { LabelSelection };
