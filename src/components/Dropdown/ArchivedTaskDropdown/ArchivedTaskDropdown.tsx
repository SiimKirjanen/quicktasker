import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/solid";
import { WPQTDropdown } from "../WPQTDropdown";
import { MenuItem } from "@headlessui/react";

function ArchivedTaskDropdown() {
  return (
    <WPQTDropdown
      menuBtn={
        <EllipsisHorizontalIcon className="wpqt-size-6 wpqt-text-gray-400 hover:wpqt-text-qtBlueHover" />
      }
    >
      <MenuItem>
        <div className="wpqt-flex wpqt-cursor-pointer wpqt-items-center">
          <TrashIcon className="wpqt-size-4 wpqt-text-red-600" />
          Delete archive item
        </div>
      </MenuItem>
    </WPQTDropdown>
  );
}

export { ArchivedTaskDropdown };
