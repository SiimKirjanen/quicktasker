import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { AnchorProps } from "@headlessui/react/dist/internal/floating";

type Props = {
  children: React.ReactNode;
  menuBtn: (props: { active: boolean }) => React.ReactNode;
  menuBtnClasses?: string;
  anchor?: AnchorProps;
};

function WPQTDropdown({
  children,
  menuBtn,
  menuBtnClasses = "",
  anchor = "bottom end",
}: Props) {
  return (
    <Menu>
      <MenuButton
        as="div"
        className={`${menuBtnClasses} wpqt-cursor-pointer`}
        onClick={(event) => event.stopPropagation()}
      >
        {({ active }) => <>{menuBtn({ active })}</>}
      </MenuButton>
      <MenuItems
        anchor={anchor}
        transition
        className="wpqt-z-20 wpqt-origin-top wpqt-rounded-xl wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-p-4 wpqt-transition wpqt-duration-200 wpqt-ease-out data-[closed]:wpqt-scale-95 data-[closed]:wpqt-opacity-0"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

type WPQTDropdownIconProps = {
  isActive?: boolean;
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

function WPQTDropdownIcon({ isActive, IconComponent }: WPQTDropdownIconProps) {
  return (
    <IconComponent
      className={`wpqt-size-6 wpqt-text-gray-400 hover:wpqt-text-qtBlueHover ${isActive ? "wpqt-text-qtBlueHover" : ""}`}
    />
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
