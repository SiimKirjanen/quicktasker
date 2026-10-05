import { useContext, useState } from "@wordpress/element";
import { __, _n, sprintf } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { WPQTMultiSelect } from "../../../../../components/common/Select/WPQTMultiSelect";
import { SET_WP_USER_PIPELINE_IDS } from "../../../../../constants";
import { useWPUserPipelineActions } from "../../../../../hooks/actions/useWPUserPipelineActions";
import { PipelinesContext } from "../../../../../providers/PipelinesContextProvider";
import { UserContext } from "../../../../../providers/UserContextProvider";
import { WPUser } from "../../../../../types/user";

type Props = {
  user: WPUser;
};

function WPUserPipelineAccess({ user }: Props) {
  const {
    state: { pipelines },
  } = useContext(PipelinesContext);
  const { userDispatch } = useContext(UserContext);
  const [selectedPipelineIds, setSelectedPipelineIds] = useState<string[]>(
    (user.pipeline_ids ?? []).map(String),
  );
  const [updating, setUpdating] = useState(false);
  const { updateWPUserPipelines } = useWPUserPipelineActions();
  const selectId = `wp-user-boards-${user.id}`;

  const boardOptions = pipelines.map((pipeline) => ({
    value: pipeline.id,
    label: pipeline.name,
  }));

  const onSelectionChange = async (pipelineIds: string[]) => {
    if (updating) {
      return;
    }

    setUpdating(true);
    const oldPipelineIds = selectedPipelineIds;
    setSelectedPipelineIds(pipelineIds);

    await updateWPUserPipelines(
      user.id,
      pipelineIds,
      (update) => {
        setSelectedPipelineIds(update.pipeline_ids.map(String));
        userDispatch({
          type: SET_WP_USER_PIPELINE_IDS,
          payload: { userId: user.id, pipelineIds: update.pipeline_ids },
        });
        update.removed_pipelines_with_assigned_tasks.forEach(
          ({ pipeline_id, task_count }) => {
            const pipeline = pipelines.find(
              (p) => p.id === String(pipeline_id),
            );

            toast.warning(
              sprintf(
                // translators: 1: user name, 2: number of tasks, 3: board name
                _n(
                  "%1$s is still assigned to %2$d task on %3$s, but can't see it until added back to the board.",
                  "%1$s is still assigned to %2$d tasks on %3$s, but can't see them until added back to the board.",
                  task_count,
                  "quicktasker",
                ),
                user.name,
                task_count,
                pipeline ? pipeline.name : "",
              ),
            );
          },
        );
      },
      () => {
        setSelectedPipelineIds(oldPipelineIds);
        toast.error(__("Failed to update the user's boards", "quicktasker"));
      },
    );
    setUpdating(false);
  };

  return (
    <div className="wpqt-mb-2" data-testid="wp-user-boards">
      <label htmlFor={selectId} className="wpqt-block wpqt-mb-2">
        {__("Boards", "quicktasker")}
      </label>
      <WPQTMultiSelect
        id={selectId}
        options={boardOptions}
        selectedValues={selectedPipelineIds}
        onSelectionChange={onSelectionChange}
        allLabel={__("All current boards", "quicktasker")}
        noneLabel={__("No boards", "quicktasker")}
        resetLabel={__("Add to all boards", "quicktasker")}
        deselectLabel={__("Remove from all boards", "quicktasker")}
      />
      <div className="wpqt-mt-1 wpqt-text-sm wpqt-text-gray-500">
        {__(
          "The user can only access the boards selected here and the boards they create.",
          "quicktasker",
        )}
      </div>
    </div>
  );
}

export { WPUserPipelineAccess };
