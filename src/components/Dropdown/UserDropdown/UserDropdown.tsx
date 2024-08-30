import {
  TrashIcon,
  PencilSquareIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/outline";
import {
  WPQTDropdown,
  WPQTDropdownIcon,
  WPQTDropdownItem,
} from "../WPQTDropdown";

function UserDropdown() {
  return (
    <WPQTDropdown menuBtn={<WPQTDropdownIcon />}>
      <WPQTDropdownItem
        text="Edit user"
        icon={<PencilSquareIcon className="wpqt-icon-green wpqt-size-4" />}
      />
      <WPQTDropdownItem
        text="User tasks"
        icon={<RectangleStackIcon className="wpqt-icon-blue wpqt-size-4" />}
      />

      <WPQTDropdownItem
        text="Disable user"
        icon={<TrashIcon className="wpqt-icon-red wpqt-size-4" />}
        className="!wpqt-mb-0"
      />
    </WPQTDropdown>
  );
}

export { UserDropdown };
