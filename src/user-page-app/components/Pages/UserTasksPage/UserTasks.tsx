import { useContext } from "@wordpress/element";
import { UserAssignedTasksContext } from "../../../providers/UserAssignedTasksContextProvider";
import { WPQTCard } from "../../../../components/Card/Card";

function UserTasks() {
  const {
    state: { assignedTasks },
  } = useContext(UserAssignedTasksContext);
  return (
    <div className="wpqt-grid wpqt-grid-cols-1 wpqt-gap-2 sm:wpqt-grid-cols-2 lg:wpqt-grid-cols-4">
      {assignedTasks.map((task) => {
        return (
          <WPQTCard title={task.name} description={task.description}></WPQTCard>
        );
      })}
    </div>
  );
}

export { UserTasks };
