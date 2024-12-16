import { MinusIcon } from "@heroicons/react/24/outline";
import { useContext, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { toast } from "react-toastify";
import {
  assignTaskToUserRequest,
  removeTaskFromUserRequest,
} from "../../../../../api/api";
import {
  PIPELINE_ADD_USER_TO_TASK,
  PIPELINE_REMOVE_USER_FROM_TASK,
} from "../../../../../constants";
import { ActivePipelineContext } from "../../../../../providers/ActivePipelineContextProvider";
import { UserContext } from "../../../../../providers/UserContextProvider";
import { Task } from "../../../../../types/task";
import { User, WPUser } from "../../../../../types/user";
import { LoadingOval } from "../../../../Loading/Loading";
import { UserAssignementSection } from "../../../../User/UserAssignementSection/UserAssignementSection";

type Props = {
  task: Task;
  onUserAdd: (user: User | WPUser) => void;
  onUserDelete: (user: User | WPUser) => void;
};

function UserAssignementSelection({ task, onUserAdd, onUserDelete }: Props) {
  const {
    state: { users, wpUsers },
  } = useContext(UserContext);
  const { dispatch } = useContext(ActivePipelineContext);
  const [loading, setLoading] = useState(false);

  const availableToAssignUsers = users.filter(
    (user: User) =>
      !(task.assigned_users ?? []).some(
        (assignedUser: User) => assignedUser.id === user.id,
      ),
  );
  const availableToAssignWPUsers = wpUsers.filter(
    (user: WPUser) =>
      !(task.assigned_wp_users ?? []).some(
        (assignedWPUser: WPUser) => assignedWPUser.id === user.id,
      ),
  );

  const assignUser = async (user: User | WPUser) => {
    try {
      setLoading(true);
      const userType = user.user_type;
      await assignTaskToUserRequest(user.id, task.id, userType);

      dispatch({
        type: PIPELINE_ADD_USER_TO_TASK,
        payload: {
          taskId: task.id,
          user,
        },
      });
      onUserAdd(user);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to assign user", "quicktasker"));
    } finally {
      setLoading(false);
    }
  };

  const removeUser = async (user: User | WPUser) => {
    try {
      setLoading(true);
      const userType = user.user_type;
      await removeTaskFromUserRequest(user.id, task.id, userType);
      dispatch({
        type: PIPELINE_REMOVE_USER_FROM_TASK,
        payload: {
          taskId: task.id,
          userId: user.id,
          userType,
        },
      });
      onUserDelete(user);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to remove user", "quicktasker"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wpqt-flex wpqt-w-[320px] wpqt-flex-col">
      <UserAssignementSection
        sectionTitle={__("Assigned quicktaskers", "quicktasker")}
        users={task.assigned_users}
        onItemSelect={removeUser}
        ActionIcon={MinusIcon}
        actionIconClasses="wpqt-icon-red"
        noUsersText={__("No quicktaskers assigned", "quicktasker")}
      />
      <UserAssignementSection
        sectionTitle={__("Assigned WordPress users", "quicktasker")}
        users={task.assigned_wp_users}
        onItemSelect={removeUser}
        ActionIcon={MinusIcon}
        actionIconClasses="wpqt-icon-red"
        noUsersText={__("No WordPress users assigned", "quicktasker")}
      />
      <UserAssignementSection
        sectionTitle={__("Assign a quicktasker", "quicktasker")}
        users={availableToAssignUsers}
        onItemSelect={assignUser}
        actionIconClasses="wpqt-icon-green"
        noUsersText={__("No quicktaskers available to assign", "quicktasker")}
      />
      <UserAssignementSection
        sectionTitle={__("Assign a WordPress user", "quicktasker")}
        users={availableToAssignWPUsers}
        onItemSelect={assignUser}
        actionIconClasses="wpqt-icon-green"
        noUsersText={__(
          "No WordPress users with required permissions available to assign",
          "quicktasker",
        )}
      />
      {loading && (
        <div className="wpqt-flex wpqt-justify-center">
          <LoadingOval width="30" height="30" />
        </div>
      )}
    </div>
  );
}
export { UserAssignementSelection };
