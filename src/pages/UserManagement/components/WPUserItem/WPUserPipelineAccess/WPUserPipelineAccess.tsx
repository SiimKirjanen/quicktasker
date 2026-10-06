import { useContext, useEffect, useRef, useState } from "@wordpress/element";
import { __, _n, sprintf } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { WPQTMultiSelect } from "../../../../../components/common/Select/WPQTMultiSelect";
import { LoadingOval } from "../../../../../components/Loading/Loading";
import {
  SET_WP_USER_PIPELINE_IDS,
  WP_QUICKTASKER_EXCEPTION_INTEGRATIONS_REMOVAL_NOT_CONFIRMED,
} from "../../../../../constants";
import { useWPUserPipelineActions } from "../../../../../hooks/actions/useWPUserPipelineActions";
import { useMissingResourceDetection } from "../../../../../hooks/useMissingResourceDetection";
import { usePipelines } from "../../../../../hooks/usePipelines";
import { UserContext } from "../../../../../providers/UserContextProvider";
import {
  PipelineIntegrationCount,
  WPUser,
  WPUserPipelinesUpdate,
} from "../../../../../types/user";
import {
  formatIntegrationCount,
  RemoveIntegrationsConfirmModal,
} from "./RemoveIntegrationsConfirmModal";

const SUMMARY_BOARD_COUNT = 5;
// More added or removed boards than this are counted instead of named.
const CHANGED_BOARD_NAME_COUNT = 3;

/**
 * The API tokens and webhooks a refused save would delete, if it was refused
 * because the admin has not confirmed deleting them.
 */
function getIntegrationsToConfirm(
  error: unknown,
): PipelineIntegrationCount[] | null {
  if (
    typeof error !== "object" ||
    error === null ||
    !("messages" in error) ||
    !Array.isArray(error.messages) ||
    !error.messages.includes(
      WP_QUICKTASKER_EXCEPTION_INTEGRATIONS_REMOVAL_NOT_CONFIRMED,
    ) ||
    !("data" in error)
  ) {
    return null;
  }
  const data = error.data as {
    pipelines_with_integrations?: PipelineIntegrationCount[];
  } | null;

  return data?.pipelines_with_integrations ?? null;
}

type Props = {
  user: WPUser;
};

function WPUserPipelineAccess({ user }: Props) {
  const { pipelines, refreshPipelines } = usePipelines();
  const { detectMissingPipelineResponse } = useMissingResourceDetection();
  const { userDispatch } = useContext(UserContext);
  const [selectedPipelineIds, setSelectedPipelineIds] = useState<string[]>(
    (user.pipeline_ids ?? []).map(String),
  );
  const [updating, setUpdating] = useState(false);
  const savedPipelineIds = useRef(selectedPipelineIds);
  // Kept in state as well, so boards that are not saved yet can show a spinner.
  const [savedIds, setSavedIds] = useState(selectedPipelineIds);
  const pendingPipelineIds = useRef<string[] | null>(null);
  const saving = useRef(false);
  const [editing, setEditing] = useState(false);
  const changeButtonRef = useRef<HTMLButtonElement>(null);
  const wasEditing = useRef(false);
  const { updateWPUserPipelines } = useWPUserPipelineActions();
  const [integrationsToConfirm, setIntegrationsToConfirm] = useState<
    PipelineIntegrationCount[] | null
  >(null);
  const resolveConfirmation = useRef<((confirmed: boolean) => void) | null>(
    null,
  );
  const selectId = `wp-user-boards-${user.id}`;
  const userPipelineIdsKey = (user.pipeline_ids ?? []).join(",");

  // The user's boards are loaded again when User management is refreshed, and
  // may have been changed by another administrator. They are shown unless a
  // selection is being saved.
  useEffect(() => {
    if (saving.current) {
      return;
    }
    const pipelineIds = (user.pipeline_ids ?? []).map(String);
    savedPipelineIds.current = pipelineIds;
    setSavedIds(pipelineIds);
    setSelectedPipelineIds(pipelineIds);
  }, [userPipelineIdsKey]);

  useEffect(() => {
    if (wasEditing.current && !editing) {
      changeButtonRef.current?.focus();
    }
    wasEditing.current = editing;
  }, [editing]);

  const boardOptions = pipelines.map((pipeline) => ({
    value: pipeline.id,
    label: pipeline.name,
  }));
  const selectedBoardNames = pipelines
    .filter((pipeline) => selectedPipelineIds.includes(pipeline.id))
    .map((pipeline) => pipeline.name);
  const hiddenBoardCount = selectedBoardNames.length - SUMMARY_BOARD_COUNT;
  const unsavedPipelineIds = updating
    ? [
        ...selectedPipelineIds.filter((id) => !savedIds.includes(id)),
        ...savedIds.filter((id) => !selectedPipelineIds.includes(id)),
      ]
    : [];

  const warnAboutAssignedTasks = (update: WPUserPipelinesUpdate) => {
    update.removed_pipelines_with_assigned_tasks.forEach(
      ({ pipeline_id, task_count }) => {
        // The board is added back by a selection that is still waiting to be saved.
        if (pendingPipelineIds.current?.includes(String(pipeline_id))) {
          return;
        }
        const pipeline = pipelines.find((p) => p.id === String(pipeline_id));

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
          // Stays until closed, so the admin has time to act on it.
          { autoClose: false },
        );
      },
    );
  };

  const getPipelineNames = (pipelineIds: string[]) =>
    pipelineIds.map(
      (id) => pipelines.find((pipeline) => pipeline.id === id)?.name ?? "",
    );

  const reportChangedPipelines = (
    addedPipelineIds: string[],
    removedPipelineIds: string[],
  ) => {
    if (addedPipelineIds.length > 0) {
      const addedNames = getPipelineNames(addedPipelineIds);

      toast.success(
        addedNames.length > CHANGED_BOARD_NAME_COUNT
          ? sprintf(
              // translators: 1: user name, 2: number of boards
              _n(
                "%1$s was added to %2$d board.",
                "%1$s was added to %2$d boards.",
                addedNames.length,
                "quicktasker",
              ),
              user.name,
              addedNames.length,
            )
          : sprintf(
              // translators: 1: user name, 2: comma separated board names
              __("%1$s was added to %2$s.", "quicktasker"),
              user.name,
              addedNames.join(", "),
            ),
      );
    }

    if (removedPipelineIds.length > 0) {
      const removedNames = getPipelineNames(removedPipelineIds);

      toast.success(
        removedNames.length > CHANGED_BOARD_NAME_COUNT
          ? sprintf(
              // translators: 1: user name, 2: number of boards
              _n(
                "%1$s was removed from %2$d board.",
                "%1$s was removed from %2$d boards.",
                removedNames.length,
                "quicktasker",
              ),
              user.name,
              removedNames.length,
            )
          : sprintf(
              // translators: 1: user name, 2: comma separated board names
              __("%1$s was removed from %2$s.", "quicktasker"),
              user.name,
              removedNames.join(", "),
            ),
      );
    }
  };

  const reportDeletedIntegrations = (update: WPUserPipelinesUpdate) => {
    update.deleted_integrations.forEach((integration) => {
      const pipeline = pipelines.find(
        (p) => p.id === String(integration.pipeline_id),
      );

      toast.info(
        sprintf(
          // translators: 1: number of API tokens and webhooks, 2: user name, 3: board name
          __("Deleted %1$s that %2$s created on %3$s.", "quicktasker"),
          formatIntegrationCount(integration),
          user.name,
          pipeline ? pipeline.name : "",
        ),
        // Stays until closed, so the admin notices what was deleted.
        { autoClose: false },
      );
    });
  };

  // Shows the confirmation and waits for the admin's answer.
  const confirmIntegrationRemoval = (
    integrations: PipelineIntegrationCount[],
  ) =>
    new Promise<boolean>((resolve) => {
      resolveConfirmation.current = resolve;
      setIntegrationsToConfirm(integrations);
    });

  const answerConfirmation = (confirmed: boolean) => {
    resolveConfirmation.current?.(confirmed);
    resolveConfirmation.current = null;
    setIntegrationsToConfirm(null);
  };

  const savePipelineIds = async (
    pipelineIds: string[],
    removeIntegrations: boolean,
  ) => {
    const result: { error: unknown } = { error: null };

    await updateWPUserPipelines(
      user.id,
      pipelineIds,
      (update) => {
        const previousPipelineIds = savedPipelineIds.current;
        savedPipelineIds.current = update.pipeline_ids.map(String);
        reportChangedPipelines(
          savedPipelineIds.current.filter(
            (id) => !previousPipelineIds.includes(id),
          ),
          previousPipelineIds.filter(
            (id) => !savedPipelineIds.current.includes(id),
          ),
        );
        setSavedIds(savedPipelineIds.current);
        userDispatch({
          type: SET_WP_USER_PIPELINE_IDS,
          payload: { userId: user.id, pipelineIds: update.pipeline_ids },
        });
        warnAboutAssignedTasks(update);
        reportDeletedIntegrations(update);
        if (!pendingPipelineIds.current) {
          setSelectedPipelineIds(savedPipelineIds.current);
        }
      },
      (error) => {
        result.error = error ?? new Error("Failed to update the boards");
      },
      removeIntegrations,
    );

    return result.error;
  };

  // Saves one selection at a time. A selection made during a save is saved
  // after it, and only the newest one is sent.
  const savePendingSelections = async () => {
    saving.current = true;
    setUpdating(true);
    let retried = false;

    while (pendingPipelineIds.current) {
      const pipelineIds = pendingPipelineIds.current;
      pendingPipelineIds.current = null;
      let error = await savePipelineIds(pipelineIds, false);

      // The removal would delete API tokens or webhooks the user created, so
      // the admin confirms it first. Cancelling keeps the saved boards.
      const integrationsToConfirm = getIntegrationsToConfirm(error);

      if (integrationsToConfirm) {
        if (!(await confirmIntegrationRemoval(integrationsToConfirm))) {
          pendingPipelineIds.current = null;
          setSelectedPipelineIds(savedPipelineIds.current);
          continue;
        }
        error = await savePipelineIds(pipelineIds, true);
      }

      if (error === null) {
        continue;
      }

      // A board was deleted since the boards were loaded, for example by another
      // administrator. It is left out and the selection saved again, once.
      if (!retried && detectMissingPipelineResponse(error)) {
        retried = true;
        const existingPipelineIds = await refreshPipelines();

        if (existingPipelineIds !== null) {
          const retryPipelineIds = (
            pendingPipelineIds.current ?? pipelineIds
          ).filter((id) => existingPipelineIds.includes(id));
          pendingPipelineIds.current = retryPipelineIds;
          setSelectedPipelineIds(retryPipelineIds);
          continue;
        }
      }

      pendingPipelineIds.current = null;
      setSelectedPipelineIds(savedPipelineIds.current);
      toast.error(__("Failed to update the user's boards", "quicktasker"));
    }

    saving.current = false;
    setUpdating(false);
  };

  // Boards not in the board list are kept, as they may have been created since
  // it was loaded. Deleted ones are left out when the save is refused.
  const onSelectionChange = (selectedIds: string[]) => {
    setSelectedPipelineIds(selectedIds);
    pendingPipelineIds.current = selectedIds;
    if (!saving.current) {
      savePendingSelections();
    }
  };

  const changeLabel = __("Change", "quicktasker");
  const changeAriaLabel = sprintf(
    // translators: %s is the user's name
    __("Change boards of %s", "quicktasker"),
    user.name,
  );
  const changeClassName =
    "wpqt-shrink-0 wpqt-cursor-pointer wpqt-border-0 wpqt-bg-transparent wpqt-p-0 wpqt-blue-text hover:wpqt-text-qtBlueHover";

  return (
    <div className="wpqt-mt-6 wpqt-mb-2" data-testid="wp-user-boards">
      <div className="wpqt-mb-2 wpqt-text-base wpqt-font-semibold">
        {__("Board access", "quicktasker")}
      </div>
      <div className="wpqt-break-words">
        {selectedBoardNames.length === 0 ? (
          <span
            className="wpqt-text-yellow-700"
            data-testid="wp-user-boards-summary"
          >
            {__("No boards", "quicktasker")}
          </span>
        ) : (
          <span
            data-testid="wp-user-boards-summary"
            title={
              hiddenBoardCount > 0 ? selectedBoardNames.join(", ") : undefined
            }
          >
            {selectedBoardNames.slice(0, SUMMARY_BOARD_COUNT).join(", ")}
            {hiddenBoardCount > 0 && (
              <>
                {" "}
                <span className="wpqt-whitespace-nowrap">
                  {sprintf(
                    // translators: %d is the number of boards not listed
                    __("+%d more", "quicktasker"),
                    hiddenBoardCount,
                  )}
                </span>
              </>
            )}
          </span>
        )}
      </div>
      <div className="wpqt-mt-1">
        {/* The selector is only created when needed, as it is slow to render
            on every card when there are many users. */}
        {editing ? (
          <WPQTMultiSelect
            id={selectId}
            options={boardOptions}
            selectedValues={selectedPipelineIds}
            onSelectionChange={onSelectionChange}
            resetLabel={__("Add to all boards", "quicktasker")}
            deselectLabel={__("Remove from all boards", "quicktasker")}
            autoOpen
            onClose={() => setEditing(false)}
            loadingValues={unsavedPipelineIds}
            trigger={changeLabel}
            triggerClassName={changeClassName}
            ariaLabel={changeAriaLabel}
            buttonTestId="wp-user-boards-change"
          />
        ) : (
          <span className="wpqt-inline-flex wpqt-items-center wpqt-gap-2">
            <button
              ref={changeButtonRef}
              type="button"
              className={changeClassName}
              aria-label={changeAriaLabel}
              data-testid="wp-user-boards-change"
              onClick={() => setEditing(true)}
            >
              {changeLabel}
            </button>
            {updating && (
              <span
                role="status"
                aria-label={__("Saving boards", "quicktasker")}
                data-testid="wp-user-boards-saving"
              >
                <LoadingOval width="16" height="16" />
              </span>
            )}
          </span>
        )}
      </div>
      <RemoveIntegrationsConfirmModal
        userName={user.name}
        integrations={integrationsToConfirm}
        pipelines={pipelines}
        onAnswer={answerConfirmation}
      />
    </div>
  );
}

export { WPUserPipelineAccess };
