import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

type Props = {
  children: React.ReactNode;
  menuBtn: React.ReactNode;
  menuBtnClasses?: string;
};

function WPQTDropdown({ children, menuBtn, menuBtnClasses = "" }: Props) {
  return (
    <Menu>
      <MenuButton
        as="div"
        className={`${menuBtnClasses} wpqt-cursor-pointer`}
        onClick={(event) => event.stopPropagation()}
      >
        {menuBtn}
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        transition
        className="wpqt-z-20 wpqt-origin-top wpqt-rounded-xl wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-p-4 wpqt-transition wpqt-duration-200 wpqt-ease-out data-[closed]:wpqt-scale-95 data-[closed]:wpqt-opacity-0"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

function WPQTDropdownIcon() {
  return (
    <EllipsisHorizontalIcon className="wpqt-size-6 wpqt-text-gray-400 hover:wpqt-text-qtBlueHover" />
  );
}

type WPQTDropdownItemProps = {
  text: string;
  onClick?: (e: React.MouseEvent) => void | Promise<void>;
  icon: React.ReactNode;
  className?: string;
};
function WPQTDropdownItem({
  text,
  onClick,
  icon,
  className,
}: WPQTDropdownItemProps) {
  return (
    <MenuItem>
      <div
        className={`${className} wpqt-mb-3 wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-2 hover:wpqt-underline`}
        onClick={onClick}
      >
        {icon}
        {text}
      </div>
    </MenuItem>
  );
}

export { WPQTDropdown, WPQTDropdownIcon, WPQTDropdownItem };
