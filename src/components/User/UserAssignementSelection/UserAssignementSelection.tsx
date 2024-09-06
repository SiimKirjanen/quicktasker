import { User } from "../../../types/user";
import { Task } from "../../../types/task";
import { useContext } from "@wordpress/element";
import { UserContext } from "../../../providers/UserContextProvider";
import {
  assignTaskToUserRequest,
  removeTaskFromUserRequest,
} from "../../../api/api";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";

type Props = {
  task: Task;
};

function UserAssignementSelection({ task }: Props) {
  const {
    state: { users },
  } = useContext(UserContext);

  const availableUsers = users.filter(
    (user: User) =>
      !task.assigned_users.some(
        (assignedUser: User) => assignedUser.id === user.id,
      ),
  );

  const assignUser = async (user: User) => {
    try {
      await assignTaskToUserRequest(user.id, task.id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to assign user to task");
    }
  };

  const removeUser = async (user: User) => {
    try {
      await removeTaskFromUserRequest(user.id, task.id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to remove user from task");
    }
  };

  return (
    <div className="wpqt-flex wpqt-w-[320px] wpqt-flex-col">
      <UserAssignementSection
        sectionTitle="Assigned users"
        users={task.assigned_users}
        onItemSelect={removeUser}
        ActionIcon={MinusIcon}
        actionIconClasses="wpqt-icon-red"
      />

      <UserAssignementSection
        sectionTitle="Assign a user"
        users={availableUsers}
        onItemSelect={assignUser}
        actionIconClasses="wpqt-icon-green"
      />
    </div>
  );
}

type UserAssignementSectionProps = {
  sectionTitle: string;
  onItemSelect?: (user: User) => void;
  users: User[];
  ActionIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  actionIconClasses?: string;
};
function UserAssignementSection({
  sectionTitle,
  onItemSelect = () => {},
  users,
  ActionIcon = PlusIcon,
  actionIconClasses,
}: UserAssignementSectionProps) {
  return (
    <div className="wpqt-mb-2">
      <div className="wpqt-mb-2">{sectionTitle}</div>
      {users.map((user: User) => {
        return (
          <div
            key={user.id}
            onClick={(e) => {
              e.stopPropagation();
              onItemSelect(user);
            }}
            className="wpqt-flex wpqt-cursor-pointer wpqt-px-2 wpqt-py-1 hover:wpqt-bg-gray-100"
          >
            {user.name}
            <ActionIcon
              className={`wpqt-ml-auto wpqt-size-5 ${actionIconClasses}`}
            />
          </div>
        );
      })}
    </div>
  );
}
export { UserAssignementSelection };
