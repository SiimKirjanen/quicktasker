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

type Props = {
  addTask: (name: string, description: string) => void;
  taskModalSaving: boolean;
  editTask: (task: Task) => void;
};

const TaskModalContent = forwardRef(
  ({ addTask, taskModalSaving, editTask }: Props, ref) => {
    const {
      state: { taskToEdit },
    } = useContext(ModalContext);
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");

    useEffect(() => {
      if (taskToEdit) {
        setTaskName(taskToEdit.name);
        setTaskDescription(taskToEdit.description);
      }
    }, [taskToEdit]);
    const editingTask = !!taskToEdit;

    const saveTask = () => {
      editingTask
        ? editTask({
            ...taskToEdit,
            name: taskName,
            description: taskDescription,
          })
        : addTask(taskName, taskDescription);
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
        </WPQTModalFieldSet>
        {editingTask && (
          <div>
            <TaskModalTabs task={taskToEdit} />
          </div>
        )}
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
