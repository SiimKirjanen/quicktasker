import { __ } from "@wordpress/i18n";

type Props = {
  children: React.ReactNode;
};
function AutomationsWrapper({ children }: Props) {
  return (
    <div>
      <h3>{__("Board automations", "quicktasker")}</h3>
      <p>{__("Allows to automate various tasks", "quicktasker")}</p>
      <div>{children}</div>
    </div>
  );
}

export { AutomationsWrapper };
