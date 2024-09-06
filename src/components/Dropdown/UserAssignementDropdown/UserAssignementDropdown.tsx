import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Task } from "../../../types/task";
import { User } from "../../../types/user";
import { WPQTDropdown } from "../WPQTDropdown";
import { UserAssignementSelection } from "../../User/UserAssignementSelection/UserAssignementSelection";

type Props = {
  task: Task;
};

function UserAssignementDropdown({ task }: Props) {
  return (
    <WPQTDropdown
      menuBtnClasses="wpqt-inline-flex"
      anchor="bottom start"
      menuBtn={({ active }) => (
        <div className="wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1">
          <UserCircleIcon
            className={`wpqt-size-5 ${active ? "wpqt-text-blue-800" : "wpqt-text-blue-400"} hover:wpqt-text-blue-800`}
          />
          {task.assigned_users && (
            <div>
              {task.assigned_users.map((user: User, index: number) => (
                <span key={user.id}>
                  {user.name}
                  {index < task.assigned_users.length - 1 && ", "}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    >
      <UserAssignementSelection task={task} />
    </WPQTDropdown>
  );
}

export { UserAssignementDropdown };
