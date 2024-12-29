import { TagIcon } from "@heroicons/react/24/outline";
import { Task } from "../../../types/task";
import { WPQTTag } from "../../common/Tag/Tag";
import { WPQTDropdown } from "../WPQTDropdown";
import { LabelDropdownContent } from "./components/LabelDropdownContent/LabelDropdownContent";

type Props = {
  task: Task;
};
function TaskLabelDropdown({ task }: Props) {
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
                  className="!wpqt-py-0.5"
                >
                  {label.name}
                </WPQTTag>
              ))}
            </div>
          )}
        </div>
      )}
    >
      {task && <LabelDropdownContent task={task} />}
    </WPQTDropdown>
  );
}

export { TaskLabelDropdown };
