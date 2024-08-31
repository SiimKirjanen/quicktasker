import {
  EllipsisHorizontalIcon,
  TrashIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";

function ArchivedTaskDropdown() {
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
        text="View task"
        icon={<EyeIcon className="wpqt-icon-blue wpqt-size-4" />}
      />

      <WPQTDropdownItem
        text="Delete"
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
        className="!wpqt-mb-0"
      />
    </WPQTDropdown>
  );
}

export { ArchivedTaskDropdown };
