import { Menu, MenuButton, MenuItems } from "@headlessui/react";

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
        anchor="bottom"
        transition
        className="wpqt-z-20 wpqt-origin-top wpqt-rounded-xl wpqt-border wpqt-border-solid wpqt-border-qtBorder wpqt-bg-white wpqt-p-4 wpqt-transition wpqt-duration-200 wpqt-ease-out data-[closed]:wpqt-scale-95 data-[closed]:wpqt-opacity-0"
      >
        {children}
      </MenuItems>
    </Menu>
  );
}

export { WPQTDropdown };
