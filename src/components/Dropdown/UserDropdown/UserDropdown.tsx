import { TrashIcon } from "@heroicons/react/24/outline";
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
        icon={<TrashIcon className="wpqt-size-4 wpqt-text-red-600" />}
      />
      <WPQTDropdownItem
        text="Disable user"
        icon={<TrashIcon className="wpqt-size-4 wpqt-text-red-600" />}
      />
      <WPQTDropdownItem
        text="User tasks"
        icon={<TrashIcon className="wpqt-size-4 wpqt-text-red-600" />}
      />
    </WPQTDropdown>
  );
}

export { UserDropdown };
