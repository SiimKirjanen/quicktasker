import { __ } from "@wordpress/i18n";
import { User } from "../../../../types/user";
import { WPQTTabs } from "../../WPQTTabs";
import { LogsTabContent } from "./LogsTabContent";
import { PrivateCommentsTabContent } from "./PrivateCommentsTabContent";
import { PublicCommentsTabContent } from "./PublicCommentsTabContent";

type Props = {
  user: User;
};
function UserModalTabs({ user }: Props) {
  const tabs = [
    { name: __("Logs", "quicktasker") },
    { name: __("Private comments", "quicktasker") },
    { name: __("Public comments", "quicktasker") },
  ];

  return (
    <WPQTTabs
      tabs={tabs}
      tabsContent={[
        <LogsTabContent userId={user.id} key={3} />,
        <PrivateCommentsTabContent userId={user.id} key={1} />,
        <PublicCommentsTabContent userId={user.id} key={2} />,
      ]}
    />
  );
}

export { UserModalTabs };
