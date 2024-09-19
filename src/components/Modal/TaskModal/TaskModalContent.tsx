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
  WPQTModalTitle,
} from "../WPQTModal";
import { TaskModalTabs } from "../../Tab/TaskModalTabs/TaskModalTabs";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTTextarea } from "../../common/TextArea/TextArea";
import { Toggle } from "../../common/Toggle/Toggle";
import { UserAssignementDropdown } from "../../Dropdown/UserAssignementDropdown/UserAssignementDropdown";
import {
  ADD_ASSIGNED_USER_TO_EDITING_TASK,
  REMOVE_ASSIGNED_USER_FROM_EDITING_TASK,
} from "../../../constants";

type Props = {
  addTask: (name: string, description: string, freeForAllTask: boolean) => void;
  taskModalSaving: boolean;
  editTask: (task: Task) => void;
};

const TaskModalContent = forwardRef(
  ({ addTask, taskModalSaving, editTask }: Props, ref) => {
    const {
      state: { taskToEdit },
      modalDispatch,
    } = useContext(ModalContext);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [freeForAllTask, setFreeForAllTask] = useState(false);

    useEffect(() => {
      if (taskToEdit) {
        setTaskName(taskToEdit.name);
        setTaskDescription(taskToEdit.description);
        setFreeForAllTask(taskToEdit.free_for_all);
      }
    }, [taskToEdit]);
    const editingTask = !!taskToEdit;

    const saveTask = () => {
      editingTask
        ? editTask({
            ...taskToEdit,
            name: taskName,
            description: taskDescription,
            free_for_all: freeForAllTask,
          })
        : addTask(taskName, taskDescription, freeForAllTask);
    };
    const clearContent = () => {
      setTaskName("");
      setTaskDescription("");
    };

    useImperativeHandle(ref, () => ({
      clearContent,
    }));

    return (
      <>
        <WPQTModalTitle>
          {editingTask ? "Edit task" : "Add task"}
        </WPQTModalTitle>

        <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-7 md:wpqt-grid-cols-[auto_1fr] lg:wpqt-grid-cols-[auto_1fr_auto]">
          <div>
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
                  onChange={(newValue: string) => setTaskDescription(newValue)}
                />
              </WPQTModalField>

              {taskToEdit && (
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
              )}

              <WPQTModalField label="Free for all task">
                <Toggle
                  checked={freeForAllTask}
                  handleChange={setFreeForAllTask}
                />
              </WPQTModalField>
            </WPQTModalFieldSet>
          </div>

          {editingTask && (
            <div>
              <div>
                <TaskModalTabs task={taskToEdit} />
              </div>
            </div>
          )}

          {editingTask && <div>Actions</div>}
        </div>
        <WPQTModalFooter
          onSave={saveTask}
          saveBtnText={
            taskModalSaving
              ? "Saving..."
              : editingTask
                ? "Edit task"
                : "Add task"
          }
        />
      </>
    );
  },
);

export { TaskModalContent };
