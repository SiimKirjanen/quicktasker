import { useContext } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { Loading } from "../../../../../../../components/Loading/Loading";
import { AutomationCreatorModal } from "../../../../../../../components/Modal/AutomationCreatorModal/AutomationCreatorModal";
import { AutomationsModal } from "../../../../../../../components/Modal/AutomationsModal/AutomationsModal";
import {
  HAS_AUTOMATIONS,
  OPEN_AUTOMATION_CREATOR_MODAL,
  OPEN_AUTOMATIONS_MODAL,
} from "../../../../../../../constants";
import { useAutomations } from "../../../../../../../hooks/useAutomations";
import { ModalContext } from "../../../../../../../providers/ModalContextProvider";
import { PipelineAutomationsContextProvider } from "../../../../../../../providers/PipelineAutomationsContextProvider";
import { Settings } from "../../../../Settings/Settings";

type Props = {
  pipelineId: string;
};
function PipelineAutomationSetting({ pipelineId }: Props) {
  const description = HAS_AUTOMATIONS
    ? __("Set up automated processes to help manage your board.", "quicktasker")
    : __(
        "Set up automated processes to help manage your board. To create more than one automation, please upgrade to the premium version.",
        "quicktasker",
      );

  return (
    <PipelineAutomationsContextProvider pipelineId={pipelineId}>
      <Settings
        title={__("Board automations", "quicktasker")}
        description={description}
      >
        <PipelineAutomationsInfo />
        <AutomationsModal />
        <AutomationCreatorModal pipelineId={pipelineId} />
      </Settings>
    </PipelineAutomationsContextProvider>
  );
}

function PipelineAutomationsInfo() {
  const { automations, loading } = useAutomations();
  const { modalDispatch } = useContext(ModalContext);
  const automationsLenght = automations?.length || 0;
  const canCreateNewAutomation = HAS_AUTOMATIONS || automationsLenght < 1;

  if (loading) {
    return <Loading ovalSize="24" className="!wpqt-items-start" />;
  }

  return (
    <div className="wpqt-text-left">
      <div className="wpqt-mb-2">
        {automationsLenght === 0 ? (
          <p>
            {__(
              "There are no automations configured for this board.",
              "quicktasker",
            )}
          </p>
        ) : (
          <div>
            <p>
              {sprintf(
                /* translators: %d: number of automations */
                __(
                  "There are %d automations configured for this board.",
                  "quicktasker",
                ),
                automationsLenght,
              )}
            </p>
            <div>
              <span
                className="wpqt-cursor-pointer wpqt-text-blue-500 hover:wpqt-underline"
                onClick={() => {
                  modalDispatch({
                    type: OPEN_AUTOMATIONS_MODAL,
                  });
                }}
              >
                {__("Manage board automations", "quicktasker")}
              </span>
            </div>
          </div>
        )}
      </div>
      {canCreateNewAutomation && (
        <div>
          <span
            className="wpqt-cursor-pointer wpqt-text-blue-500 hover:wpqt-underline"
            onClick={() => {
              modalDispatch({
                type: OPEN_AUTOMATION_CREATOR_MODAL,
              });
            }}
          >
            {__("Create a new automation", "quicktasker")}
          </span>
        </div>
      )}
    </div>
  );
}

export { PipelineAutomationSetting };
