import {
  PencilSquareIcon,
  TagIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  SET_LABEL_ACTION_STATE_CREATION,
  SET_LABEL_ACTION_STATE_EDITING,
} from "../../../../../constants";
import { LabelContext } from "../../../../../providers/LabelsContextProvider";
import { Label, SelectionLabel } from "../../../../../types/label";
import { WPQTIconButton } from "../../../../common/Button/WPQTIconButton/WPQTIconButton";
import { WPQTOnlyIconBtn } from "../../../../common/Button/WPQTOnlyIconBtn/WPQTOnlyIconBtn";
import { WPQTTag } from "../../../../common/Tag/Tag";
import { WPQTConfirmTooltip } from "../../../../Dialog/ConfirmTooltip/ConfirmTooltip";
import { Loading, LoadingOval } from "../../../../Loading/Loading";

type Props = {
  labels: SelectionLabel[] | null;
  title: string;
  description: string;
  labelSelected: (
    labelId: string,
  ) => Promise<{ success: boolean; label?: Label }>;
  labelDeSelection: (labelId: string) => Promise<{ success: boolean }>;
  deleteLabe: (labelId: string) => Promise<void>;
  loading?: boolean;
};
function LabelSelection({
  labels,
  title,
  description,
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
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-4">
      <div>
        <div className="wpqt-text-lg">{title}</div>
        <div className="wpqt-max-w-sm">{description}</div>
      </div>
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
      <div className="wpqt-flex wpqt-gap-2 wpqt-justify-end">
        <WPQTIconButton
          onClick={() => {
            labelDispatch({ type: SET_LABEL_ACTION_STATE_CREATION });
          }}
          className="wpqt-mt-3"
          icon={<TagIcon className="wpqt-text-blue-400 wpqt-size-5" />}
          text={__("Create new label", "quicktasker")}
        />
      </div>
    </div>
  );
}

type SelectionLabelProps = {
  label: SelectionLabel;
  labelSelected: (
    labelId: string,
  ) => Promise<{ success: boolean; label?: Label }>;
  labelDeSelection: (labelId: string) => Promise<{ success: boolean }>;
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
  const [checkboxLoading, setCheckboxLoading] = useState(false);

  const onSelectionToggle = async (
    element: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const isSelected = element.target.checked;

    setCheckboxLoading(true);
    const { success } = isSelected
      ? await labelSelected(label.id)
      : await labelDeSelection(label.id);
    setCheckboxLoading(false);

    if (success) {
      setIsSelected(isSelected);
    }
  };

  return (
    <div className="wpqt-flex wpqt-items-center wpqt-justify-between wpqt-gap-2 wpqt-w-full">
      {checkboxLoading ? (
        <LoadingOval width="20" height="20" />
      ) : (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelectionToggle}
        />
      )}
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
            "Are you sure you want to delete the label from this board?",
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
