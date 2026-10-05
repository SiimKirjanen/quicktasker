import {
  ExclamationTriangleIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isWPUser } from "../../../guards/user-guard";
import { UserContext } from "../../../providers/UserContextProvider";
import { Task } from "../../../types/task";
import { User, WPUser } from "../../../types/user";
import { canWPUserAccessPipeline } from "../../../utils/user";

import { WPQTDropdown } from "../WPQTDropdown";
import { UserAssignementSelection } from "./components/UserAssignementSelection/UserAssignementSelection";

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
  const {
    state: { wpUsers },
  } = useContext(UserContext);
  const combinedUsers = [
    ...(task.assigned_users || []),
    ...(task.assigned_wp_users || []),
  ];
  const hasAssignedUsers = combinedUsers.length > 0;

  // Assigned users carry no board access, so it is read from the known WordPress users.
  const lacksBoardAccess = (user: User | WPUser) => {
    if (!isWPUser(user)) {
      return false;
    }
    const wpUser = wpUsers.find((u) => u.id === String(user.id));

    return wpUser ? !canWPUserAccessPipeline(wpUser, task.pipeline_id) : false;
  };

  return (
    <WPQTDropdown
      menuBtnClasses={`wpqt-inline-flex ${menuBtnClasses}`}
      anchor="bottom start"
      menuBtn={() => (
        <div className="wpqt-group wpqt-inline-flex wpqt-cursor-pointer wpqt-items-center wpqt-gap-1">
          <UserCircleIcon
            className={`wpqt-mr-1 wpqt-size-5 ${hasAssignedUsers ? "wpqt-text-blue-400" : "wpqt-text-gray-300"} group-hover:wpqt-text-blue-600`}
            data-testid="user-assignment-icon"
          />
          {hasAssignedUsers && (
            <div>
              {combinedUsers.map((user, index) => (
                <span key={index}>
                  {user.name}
                  {lacksBoardAccess(user) && (
                    <span
                      className="wpqt-inline-flex wpqt-align-middle"
                      title={__("No access to this board", "quicktasker")}
                      data-testid="no-board-access-warning"
                    >
                      <ExclamationTriangleIcon
                        className="wpqt-ml-0.5 wpqt-size-4 wpqt-text-yellow-700"
                        aria-label={__(
                          "No access to this board",
                          "quicktasker",
                        )}
                      />
                    </span>
                  )}
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
