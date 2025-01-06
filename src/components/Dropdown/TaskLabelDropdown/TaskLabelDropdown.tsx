import { TagIcon } from "@heroicons/react/24/outline";
import { Label } from "../../../types/label";
import { Task } from "../../../types/task";
import { WPQTTag } from "../../common/Tag/Tag";
import { WPQTDropdown } from "../WPQTDropdown";
import { LabelDropdownContent } from "./components/LabelDropdownContent/LabelDropdownContent";

type Props = {
  task: Task;
  labelSelected?: (label: Label) => void;
  labelDeselected?: (labelId: string) => void;
  labelDeleted?: (labelId: string) => void;
};
function TaskLabelDropdown({
  task,
  labelSelected = () => {},
  labelDeselected = () => {},
  labelDeleted = () => {},
}: Props) {
  const assignedLabels = task.assigned_labels || [];
  const hasAssignedLabels =
    Array.isArray(assignedLabels) && assignedLabels.length > 0;

  return (
    <WPQTDropdown
      menuBtnClasses={`wpqt-inline-flex`}
      anchor="bottom start"
      menuBtn={() => (
        <div className="wpqt-group wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1.5">
          <TagIcon
            className={`wpqt-mr-1 wpqt-size-5 ${hasAssignedLabels ? "wpqt-text-blue-400" : "wpqt-text-gray-300"} group-hover:wpqt-text-blue-600`}
          />
          {hasAssignedLabels && (
            <div className="wpqt-flex wpqt-gap-1 wpqt-flex-wrap">
              {assignedLabels.map((label) => (
                <WPQTTag
                  key={label.id}
                  inlineStyle={{ backgroundColor: label.color }}
                >
                  {label.name}
                </WPQTTag>
              ))}
            </div>
          )}
        </div>
      )}
    >
      {task && (
        <LabelDropdownContent
          task={task}
          labelSelected={labelSelected}
          labelDeselected={labelDeselected}
          labelDeleted={labelDeleted}
        />
      )}
    </WPQTDropdown>
  );
}

export { TaskLabelDropdown };
