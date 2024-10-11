import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Task } from "../../../types/task";
import { User } from "../../../types/user";
import { UserAssignementSelection } from "../../User/UserAssignementSelection/UserAssignementSelection";
import { WPQTDropdown } from "../WPQTDropdown";

type Props = {
  task: Task;
  onUserAdd?: (user: User) => void;
  onUserDelete?: (user: User) => void;
};

function UserAssignementDropdown({
  task,
  onUserAdd = () => {},
  onUserDelete = () => {},
}: Props) {
  return (
    <WPQTDropdown
      menuBtnClasses="wpqt-inline-flex"
      anchor="bottom start"
      menuBtn={({ active }) => (
        <div className="wpqt-group wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1">
          <UserCircleIcon
            className={`wpqt-mr-1 wpqt-size-5 ${active ? "wpqt-text-blue-800" : "wpqt-text-blue-400"} group-hover:wpqt-text-blue-800`}
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
      <UserAssignementSelection
        task={task}
        onUserAdd={onUserAdd}
        onUserDelete={onUserDelete}
      />
    </WPQTDropdown>
  );
}

export { UserAssignementDropdown };
