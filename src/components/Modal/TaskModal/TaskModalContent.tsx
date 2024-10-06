import {
  forwardRef,
  useContext,
  useEffect,
  useImperativeHandle,
  useState,
} from "@wordpress/element";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Task } from "../../../types/task";
import {
  WPQTModalField,
  WPQTModalFieldSet,
  WPQTModalFooter,
} from "../WPQTModal";

import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { Toggle } from "../../common/Toggle/Toggle";
import { UserAssignementDropdown } from "../../Dropdown/UserAssignementDropdown/UserAssignementDropdown";
import {
  ADD_ASSIGNED_USER_TO_EDITING_TASK,
  CLOSE_TASK_MODAL,
  REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
} from "../../../constants";
import { WPQTIconButton } from "../../common/Button/Button";
import { ArchiveBoxIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { TaskModalTabs } from "../../Tab/CommentsAndLogs/TaskModalTabs/TaskModalTabs";
import { CustomFieldEntityType } from "../../../types/custom-field";
import { CustomFieldsInModalWrap } from "../../CustomField/CustomFieldsInModalWrap/CustomFieldsInModalWrap";

type Props = {
  taskModalSaving: boolean;
  editTask: (task: Task) => void;
};

const TaskModalContent = forwardRef(
  ({ taskModalSaving, editTask }: Props, ref) => {
    const {
      state: { taskToEdit },
      modalDispatch,
    } = useContext(ModalContext);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [freeForAllTask, setFreeForAllTask] = useState(false);
    const { deleteTask, archiveTask } = useTaskActions();
    const {
      state: { activePipeline },
      fetchAndSetPipelineData,
    } = useContext(ActivePipelineContext);

    useEffect(() => {
      if (taskToEdit) {
        setTaskName(taskToEdit.name);
        setTaskDescription(taskToEdit.description);
        setFreeForAllTask(taskToEdit.free_for_all);
      }
    }, [taskToEdit]);

    const saveTask = () => {
      if (taskToEdit) {
        editTask({
          ...taskToEdit,
          name: taskName,
          description: taskDescription,
          free_for_all: freeForAllTask,
        });
      }
    };
    const clearContent = () => {
      setTaskName("");
      setTaskDescription("");
    };

    useImperativeHandle(ref, () => ({
      clearContent,
    }));

    if (!taskToEdit) {
      return null;
    }

    return (
      <>
        <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 md:wpqt-grid-cols-[1fr_auto]">
          <div className="wpqt-border-0 wpqt-border-r wpqt-border-solid wpqt-border-r-gray-300 md:wpqt-pr-3">
            <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-4 md:wpqt-grid-cols-[auto_1fr]">
              <WPQTModalFieldSet>
                <WPQTModalField label="Name">
                  <WPQTInput
                    isAutoFocus={true}
                    value={taskName}
                    onChange={(newValue: string) => setTaskName(newValue)}
                  />
                </WPQTModalField>

                <WPQTModalField label="Description">
                  <WPQTTextarea
                    rowsCount={3}
                    value={taskDescription}
                    onChange={(newValue: string) =>
                      setTaskDescription(newValue)
                    }
                  />
                </WPQTModalField>

                <WPQTModalField label="Assigned users">
                  <UserAssignementDropdown
                    task={taskToEdit}
                    onUserAdd={(user) => {
                      modalDispatch({
                        type: ADD_ASSIGNED_USER_TO_EDITING_TASK,
                        payload: user,
                      });
                    }}
                    onUserDelete={(user) => {
                      modalDispatch({
                        type: REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
                        payload: user,
                      });
                    }}
                  />
                </WPQTModalField>

                <WPQTModalField label="Free for all task">
                  <Toggle
                    checked={freeForAllTask}
                    handleChange={setFreeForAllTask}
                  />
                </WPQTModalField>
              </WPQTModalFieldSet>
              <div>
                <CustomFieldsInModalWrap
                  entityId={taskToEdit.id}
                  entityType={CustomFieldEntityType.Task}
                  pipelineId={activePipeline!.id}
                />
              </div>
            </div>

            <div className="md:wpqt-pr-3">
              <TaskModalTabs task={taskToEdit} />
            </div>
          </div>

          <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
            <WPQTIconButton
              icon={<ArchiveBoxIcon className="wpqt-icon-blue wpqt-size-5" />}
              text="Archive task"
              onClick={() => {
                archiveTask(taskToEdit.id, () => {
                  modalDispatch({ type: CLOSE_TASK_MODAL });
                  fetchAndSetPipelineData(activePipeline!.id);
                });
              }}
            />
            <WPQTIconButton
              icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
              text="Delete task"
              onClick={() => {
                deleteTask(taskToEdit.id, () => {
                  modalDispatch({ type: CLOSE_TASK_MODAL });
                  if (activePipeline) {
                    fetchAndSetPipelineData(activePipeline.id);
                  }
                });
              }}
            />
          </div>
        </div>
        <WPQTModalFooter
          onSave={saveTask}
          saveBtnText={taskModalSaving ? "Saving..." : "Save"}
        />
      </>
    );
  },
);

export { TaskModalContent };
