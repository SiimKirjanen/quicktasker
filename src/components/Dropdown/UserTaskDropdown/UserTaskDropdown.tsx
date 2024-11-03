import {
  EllipsisHorizontalIcon,
  UserMinusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";

type Props = {
  taskId: string;
  onUnAssignTask: (taskId: string) => Promise<void>;
};
function UserTaskDropdown({ taskId, onUnAssignTask }: Props) {
  const [isUnassigning, setIsUnassigning] = useState(false);

  return (
    <WPQTDropdown
      menuBtn={({ active }) => (
        <WPQTDropdownIcon
          isActive={active}
          IconComponent={EllipsisHorizontalIcon}
        />
      )}
    >
      <WPQTDropdownItem
        text={__("Unassign from task", "quicktasker")}
        loading={isUnassigning}
        icon={<UserMinusIcon className="wpqt-icon-red wpqt-size-4" />}
        onClick={async (e) => {
          e.stopPropagation();
          setIsUnassigning(true);
          await onUnAssignTask(taskId);
          setIsUnassigning(false);
        }}
        className="!wpqt-mb-0"
      />
    </WPQTDropdown>
  );
}

export { UserTaskDropdown };
