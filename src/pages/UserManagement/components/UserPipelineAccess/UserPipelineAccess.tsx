import { useContext, useEffect, useRef, useState } from "@wordpress/element";
import { __, _n, sprintf } from "@wordpress/i18n";
import { toast } from "react-toastify";
import { WPQTMultiSelect } from "../../../../components/common/Select/WPQTMultiSelect";
import { LoadingOval } from "../../../../components/Loading/Loading";
import {
  SET_USER_PIPELINE_IDS,
  SET_WP_USER_PIPELINE_IDS,
} from "../../../../constants";
import { isWPUser } from "../../../../guards/user-guard";
import { useUserPipelineActions } from "../../../../hooks/actions/useUserPipelineActions";
import { useMissingResourceDetection } from "../../../../hooks/useMissingResourceDetection";
import { usePipelines } from "../../../../hooks/usePipelines";
import { UserContext } from "../../../../providers/UserContextProvider";
import { User, UserPipelinesUpdate, WPUser } from "../../../../types/user";
import {
  formatIntegrationCount,
  showStoppedIntegrationsWarning,
} from "../WPUserItem/StoppedIntegrationsWarning/StoppedIntegrationsWarning";

const SUMMARY_BOARD_COUNT = 5;
// More added or removed boards than this are counted instead of named.
const CHANGED_BOARD_NAME_COUNT = 3;

type Props = {
  user: User | WPUser;
};

// Boards to add the user to and remove them from.
type PipelineChanges = {
  add: string[];
  remove: string[];
};

const applyChanges = (
  pipelineIds: string[],
  changes: PipelineChanges | null,
): string[] =>
  changes
    ? [
        ...pipelineIds.filter((id) => !changes.remove.includes(id)),
        ...changes.add.filter((id) => !pipelineIds.includes(id)),
      ]
    : pipelineIds;

// A newer change to a board replaces an older one.
const mergeChanges = (
  older: PipelineChanges | null,
  newer: PipelineChanges,
): PipelineChanges => {
  const isChangedByNewer = (id: string) =>
    newer.add.includes(id) || newer.remove.includes(id);

  return {
    add: [
      ...(older?.add ?? []).filter((id) => !isChangedByNewer(id)),
      ...newer.add,
    ],
    remove: [
      ...(older?.remove ?? []).filter((id) => !isChangedByNewer(id)),
      ...newer.remove,
    ],
  };
};

/**
 * Shows the boards a WordPress user or a QuickTasker user has been added to,
 * and lets administrators change them.
 */
function UserPipelineAccess({ user }: Props) {
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
  // Changes made while another change is being saved, saved after it.
  const pendingChanges = useRef<PipelineChanges | null>(null);
  const saving = useRef(false);
  const [editing, setEditing] = useState(false);
  const changeButtonRef = useRef<HTMLButtonElement>(null);
  const wasEditing = useRef(false);
  const { updateUserPipelines } = useUserPipelineActions();
  // User IDs of the two types can be the same, so the type is part of the IDs.
  const testIdPrefix = isWPUser(user) ? "wp-user-boards" : "quicktasker-boards";
  const selectId = `${testIdPrefix}-${user.id}`;
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

  const warnAboutAssignedTasks = (update: UserPipelinesUpdate) => {
    update.removed_pipelines_with_assigned_tasks.forEach(
      ({ pipeline_id, task_count }) => {
        // The board is added back by a change that is still waiting to be saved.
        if (pendingChanges.current?.add.includes(String(pipeline_id))) {
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

  // Only WordPress users create API tokens, webhooks and automations.
  const warnAboutStoppedIntegrations = (update: UserPipelinesUpdate) => {
    (update.stopped_integrations ?? []).forEach((integration) => {
      // The board is added back by a change that is still waiting to be saved.
      if (
        pendingChanges.current?.add.includes(String(integration.pipeline_id))
      ) {
        return;
      }
      const pipeline = pipelines.find(
        (p) => p.id === String(integration.pipeline_id),
      );

      showStoppedIntegrationsWarning(
        integration,
        sprintf(
          // translators: 1: user name, 2: numbers of API tokens, webhooks and automations, like "1 API token and 2 automations", 3: board name
          __(
            "%2$s by %1$s on %3$s won't work without board access.",
            "quicktasker",
          ),
          user.name,
          formatIntegrationCount(integration),
          pipeline ? pipeline.name : "",
        ),
      );
    });
  };

  // Saves one change at a time. Changes made during a save are saved together
  // after it.
  const savePendingChanges = async () => {
    saving.current = true;
    setUpdating(true);
    let retried = false;

    while (pendingChanges.current) {
      const changes = pendingChanges.current;
      pendingChanges.current = null;
      const result: { error: unknown } = { error: null };

      await updateUserPipelines(
        user.user_type,
        user.id,
        changes.add,
        changes.remove,
        (update) => {
          // Includes boards another administrator added the user to since
          // they were loaded.
          savedPipelineIds.current = update.pipeline_ids.map(String);
          reportChangedPipelines(
            update.added_pipeline_ids.map(String),
            update.removed_pipeline_ids.map(String),
          );
          setSavedIds(savedPipelineIds.current);
          userDispatch({
            type: isWPUser(user)
              ? SET_WP_USER_PIPELINE_IDS
              : SET_USER_PIPELINE_IDS,
            payload: { userId: user.id, pipelineIds: update.pipeline_ids },
          });
          warnAboutAssignedTasks(update);
          warnAboutStoppedIntegrations(update);
          setSelectedPipelineIds(
            applyChanges(savedPipelineIds.current, pendingChanges.current),
          );
          // Boards created since the board list was loaded are loaded, so
          // they can be shown.
          if (
            savedPipelineIds.current.some(
              (id) => !pipelines.some((pipeline) => pipeline.id === id),
            )
          ) {
            refreshPipelines();
          }
        },
        (error) => {
          result.error = error ?? new Error("Failed to update the boards");
        },
      );
      const error = result.error;

      if (error === null) {
        continue;
      }

      // A board was deleted since the boards were loaded, for example by another
      // administrator. It is left out and the change saved again, once.
      if (!retried && detectMissingPipelineResponse(error)) {
        retried = true;
        const existingPipelineIds = await refreshPipelines();

        if (existingPipelineIds !== null) {
          pendingChanges.current = mergeChanges(
            {
              add: changes.add.filter((id) => existingPipelineIds.includes(id)),
              remove: changes.remove,
            },
            pendingChanges.current ?? { add: [], remove: [] },
          );
          setSelectedPipelineIds(
            applyChanges(savedPipelineIds.current, pendingChanges.current),
          );
          continue;
        }
      }

      pendingChanges.current = null;
      setSelectedPipelineIds(savedPipelineIds.current);
      toast.error(__("Failed to update the user's boards", "quicktasker"));
    }

    saving.current = false;
    setUpdating(false);
  };

  // Only the boards that were ticked or unticked are saved, so boards not in
  // the board list, like ones created since it was loaded, are kept.
  const onSelectionChange = (selectedIds: string[]) => {
    const changes = {
      add: selectedIds.filter((id) => !selectedPipelineIds.includes(id)),
      remove: selectedPipelineIds.filter(
        (id) =>
          !selectedIds.includes(id) &&
          boardOptions.some((option) => option.value === id),
      ),
    };

    if (changes.add.length === 0 && changes.remove.length === 0) {
      return;
    }

    setSelectedPipelineIds(applyChanges(selectedPipelineIds, changes));
    pendingChanges.current = mergeChanges(pendingChanges.current, changes);
    if (!saving.current) {
      savePendingChanges();
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

  // Users who can manage the site, like ones with a custom role that has the
  // manage_options capability, see every board whatever boards they were added
  // to, so there is nothing to change.
  if (isWPUser(user) && user.can_access_all_pipelines) {
    return (
      <div className="wpqt-mt-6 wpqt-mb-2" data-testid={testIdPrefix}>
        <div className="wpqt-mb-2 wpqt-text-base wpqt-font-semibold">
          {__("Board access", "quicktasker")}
        </div>
        <div data-testid={`${testIdPrefix}-summary`}>
          {__("All boards", "quicktasker")}
        </div>
        <div className="wpqt-mt-1 wpqt-text-sm wpqt-text-gray-500">
          {__("Can manage this site, so sees every board.", "quicktasker")}
        </div>
      </div>
    );
  }

  return (
    <div className="wpqt-mt-6 wpqt-mb-2" data-testid={testIdPrefix}>
      <div className="wpqt-mb-2 wpqt-text-base wpqt-font-semibold">
        {__("Board access", "quicktasker")}
      </div>
      <div className="wpqt-break-words">
        {selectedBoardNames.length === 0 ? (
          <span
            className="wpqt-text-yellow-700"
            data-testid={`${testIdPrefix}-summary`}
          >
            {__("No boards", "quicktasker")}
          </span>
        ) : (
          <span
            data-testid={`${testIdPrefix}-summary`}
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
            buttonTestId={`${testIdPrefix}-change`}
          />
        ) : (
          <span className="wpqt-inline-flex wpqt-items-center wpqt-gap-2">
            <button
              ref={changeButtonRef}
              type="button"
              className={changeClassName}
              aria-label={changeAriaLabel}
              data-testid={`${testIdPrefix}-change`}
              onClick={() => setEditing(true)}
            >
              {changeLabel}
            </button>
            {updating && (
              <span
                role="status"
                aria-label={__("Saving boards", "quicktasker")}
                data-testid={`${testIdPrefix}-saving`}
              >
                <LoadingOval width="16" height="16" />
              </span>
            )}
          </span>
        )}
      </div>
    </div>
  );
}

export { UserPipelineAccess };
