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

            <div className="md:wpqt-pr-3">
              <TaskModalTabs task={taskToEdit} />
            </div>
          </div>

          <div>Actions</div>
        </div>
        <WPQTModalFooter
          onSave={saveTask}
          saveBtnText={taskModalSaving ? "Saving..." : "Edit task"}
        />
      </>
    );
  },
);

export { TaskModalContent };
