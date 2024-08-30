import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/solid";
import { WPQTDropdown, WPQTDropdownItem } from "../WPQTDropdown";

function ArchivedTaskDropdown() {
  return (
    <WPQTDropdown
      menuBtn={
        <EllipsisHorizontalIcon className="wpqt-size-6 wpqt-text-gray-400 hover:wpqt-text-qtBlueHover" />
      }
    >
      <WPQTDropdownItem
        text="Delete archive item"
        icon={<TrashIcon className="wpqt-size-4 wpqt-text-red-600" />}
      />
    </WPQTDropdown>
  );
}

export { ArchivedTaskDropdown };
