import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard, WPQTCardDataItem } from "../../../../components/Card/Card";
import { UserDropdown } from "../../../../components/Dropdown/UserDropdown/UserDropdown";
import { OPEN_EDIT_USER_MODAL } from "../../../../constants";
import { usePageLinks } from "../../../../hooks/usePageLinks";
import { useTimezone } from "../../../../hooks/useTimezone";
import { ModalContext } from "../../../../providers/ModalContextProvider";
import { User } from "../../../../types/user";

type Props = {
  user: User;
};

function UserListItem({ user }: Props) {
  const { userPage } = usePageLinks();
  const { modalDispatch } = useContext(ModalContext);
  const { convertToWPTimezone } = useTimezone();

  const userIsActive = user.is_active;
  const hasPassword = user.has_password;

  return (
    <WPQTCard
      title={user.name}
      description={user.description}
      dropdown={<UserDropdown user={user} />}
      onClick={() => {
        modalDispatch({
          type: OPEN_EDIT_USER_MODAL,
          payload: user,
        });
      }}
      className="wpqt-cursor-pointer"
    >
      <WPQTCardDataItem
        label={__("Users page", "quicktasker")}
        value={"Link"}
        valueLink={userPage + "&code=" + user.page_hash}
      />
      <WPQTCardDataItem
        label={__("User created at", "quicktasker")}
        value={convertToWPTimezone(user.created_at)}
      />
      <WPQTCardDataItem
        label={__("Status", "quicktasker")}
        value={
          userIsActive
            ? __("Active", "quicktasker")
            : __("Disabled", "quicktasker")
        }
        valueClassName={
          userIsActive
            ? "wpqt-text-qtTextGreen wpqt-font-bold"
            : "wpqt-text-qtTextRed wpqt-font-bold"
        }
      />
      <WPQTCardDataItem
        label={__("Password set", "quicktasker")}
        value={hasPassword ? __("Yes", "quicktasker") : __("No", "quicktasker")}
        valueClassName={
          hasPassword
            ? "wpqt-text-qtTextGreen wpqt-font-bold"
            : "wpqt-text-qtTextRed wpqt-font-bold"
        }
      />
    </WPQTCard>
  );
}

export { UserListItem };
