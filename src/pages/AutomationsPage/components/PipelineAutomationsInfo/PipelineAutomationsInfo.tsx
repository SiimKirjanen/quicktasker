import { __, sprintf } from "@wordpress/i18n";
import { useAutomations } from "../../../../hooks/useAutomations";

function PipelineAutomationsInfo() {
  const { automations } = useAutomations();
  const automationsLenght = automations?.length || 0;

  if (automationsLenght === 0) {
    return (
      <p>
        {__("There are no automations created for this board.", "quicktasker")}
      </p>
    );
  }

  return (
    <p>
      {sprintf(
        /* translators: %d: number of automations */
        __("There are %d automations created for this board.", "quicktasker"),
        automationsLenght,
      )}
    </p>
  );
}

export { PipelineAutomationsInfo };
