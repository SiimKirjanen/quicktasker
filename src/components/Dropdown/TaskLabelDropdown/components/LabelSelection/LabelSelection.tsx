import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  SET_LABEL_ACTION_STATE_CREATION,
  SET_LABEL_ACTION_STATE_EDITING,
} from "../../../../../constants";
import { LabelContext } from "../../../../../providers/LabelsContextProvider";
import { SelectionLabel } from "../../../../../types/label";
import { ButtonStyleType, WPQTButton } from "../../../../common/Button/Button";
import { WPQTIconButton } from "../../../../common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTOnlyIconBtn } from "../../../../common/Button/WPQTOnlyIconBtn/WPQTOnlyIconBtn";
import { WPQTTag } from "../../../../common/Tag/Tag";
import { WPQTConfirmTooltip } from "../../../../Dialog/ConfirmTooltip/ConfirmTooltip";
import { Loading } from "../../../../Loading/Loading";

type Props = {
  labels: SelectionLabel[] | null;
  title: string;
  labelSelected: (labelId: string) => void;
  labelDeSelection: (labelId: string) => void;
  deleteLabe: (labelId: string) => Promise<void>;
  loading?: boolean;
};
function LabelSelection({
  labels,
  title,
  labelSelected,
  labelDeSelection,
  deleteLabe,
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
            deleteLabe={deleteLabe}
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
  deleteLabe: (labelId: string) => Promise<void>;
};
function SelectionLabel({
  label,
  labelSelected,
  labelDeSelection,
  deleteLabe,
}: SelectionLabelProps) {
  const { labelDispatch } = useContext(LabelContext);
  const [isSelected, setIsSelected] = useState(label.selected);
  const [isDeleting, setIsDeleting] = useState(false);

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
      <WPQTTag
        inlineStyle={{ backgroundColor: label.color }}
        className="wpqt-py-2"
      >
        {label.name}
      </WPQTTag>
      <div className="wpqt-flex wpqt-gap-2">
        <WPQTIconButton
          icon={<PencilSquareIcon className="wpqt-icon-green wpqt-size-4" />}
          onClick={() => {
            labelDispatch({
              type: SET_LABEL_ACTION_STATE_EDITING,
              payload: label,
            });
          }}
        />
        <WPQTConfirmTooltip
          confirmMessage={__(
            "Are you sure you want to delete the label from the board?",
            "quicktasker",
          )}
          onConfirm={async () => {
            setIsDeleting(true);
            await deleteLabe(label.id);
            setIsDeleting(false);
          }}
          containerClassName="wpqt-flex"
        >
          {({ onClick }) => (
            <WPQTOnlyIconBtn
              icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
              className="wpqt-p-2"
              onClick={onClick}
              loading={isDeleting}
            />
          )}
        </WPQTConfirmTooltip>
      </div>
    </div>
  );
}

export { LabelSelection };
