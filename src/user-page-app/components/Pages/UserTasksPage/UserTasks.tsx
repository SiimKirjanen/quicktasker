import { useContext } from "@wordpress/element";
import { useNavigate } from "react-router-dom";
import { WPQTCard } from "../../../../components/Card/Card";
import { UserAssignedTasksContext } from "../../../providers/UserAssignedTasksContextProvider";

function UserTasks() {
  const {
    state: { assignedTasks },
  } = useContext(UserAssignedTasksContext);
  const navigate = useNavigate();

  return (
    <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-2 sm:wpqt-grid-cols-2 lg:wpqt-grid-cols-4">
      {assignedTasks.map((task) => {
        return (
          <WPQTCard
            key={task.id}
            className="wpqt-cursor-pointer"
            title={task.name}
            description={task.description}
            onClick={() => navigate(`/tasks/${task.task_hash}`)}
          ></WPQTCard>
        );
      })}
    </div>
  );
}

export { UserTasks };
