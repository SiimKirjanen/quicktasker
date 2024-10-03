import { User } from "../../../../types/user";
import { WPQTTabs } from "../../WPQTTabs";
import { LogsTabContent } from "./LogsTabContent";
import { PrivateCommentsTabContent } from "./PrivateCommentsTabContent";
import { PublicCommentsTabContent } from "./PublicCommentsTabContent";

type Props = {
  user: User;
};
function UserModalTabs({ user }: Props) {
  const tabs = ["Private comments", "Public comments", "Logs"];

  return (
    <WPQTTabs
      tabs={tabs}
      tabsContent={[
        <PrivateCommentsTabContent userId={user.id} key={1} />,
        <PublicCommentsTabContent userId={user.id} key={2} />,
        <LogsTabContent userId={user.id} key={3} />,
      ]}
    />
  );
}

export { UserModalTabs };
