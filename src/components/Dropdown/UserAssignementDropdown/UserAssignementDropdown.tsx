import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Task } from "../../../types/task";
import { User, WPUser } from "../../../types/user";
import { UserAssignementSelection } from "../../User/UserAssignementSelection/UserAssignementSelection";
import { WPQTDropdown } from "../WPQTDropdown";

type Props = {
  task: Task;
  onUserAdd?: (user: User | WPUser) => void;
  onUserDelete?: (user: User | WPUser) => void;
  menuBtnClasses?: string;
};

function UserAssignementDropdown({
  task,
  onUserAdd = () => {},
  onUserDelete = () => {},
  menuBtnClasses = "",
}: Props) {
  const combinedUsers = [
    ...(task.assigned_users || []),
    ...(task.assigned_wp_users || []),
  ];
  const hasAssignedUsers = combinedUsers.length > 0;

  return (
    <WPQTDropdown
      menuBtnClasses={`wpqt-inline-flex ${menuBtnClasses}`}
      anchor="bottom start"
      menuBtn={() => (
        <div className="wpqt-group wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1">
          <UserCircleIcon
            className={`wpqt-mr-1 wpqt-size-5 ${hasAssignedUsers ? "wpqt-text-blue-400" : "wpqt-text-gray-300"} group-hover:wpqt-text-blue-600`}
          />
          {hasAssignedUsers && (
            <div>
              {combinedUsers.map((user, index) => (
                <span key={index}>
                  {user.name}
                  {index < combinedUsers.length - 1 && ", "}
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
