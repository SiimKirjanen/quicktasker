import { CheckIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
import { isWPUser } from "../../../../../guards/user-guard";
import { useAutomationActions } from "../../../../../hooks/actions/useAutomationActions";
import { ActivePipelineContext } from "../../../../../providers/ActivePipelineContextProvider";
import { UserContext } from "../../../../../providers/UserContextProvider";
import { Task } from "../../../../../types/task";
import { User, UserTypes, WPUser } from "../../../../../types/user";
import { QuickTaskerIcon } from "../../../../Icon/QuickTaskerIcon/QuickTaskerIcon";
import { WordPressIcon } from "../../../../Icon/WordPressIcon/WordPressIcon";
import { LoadingOval } from "../../../../Loading/Loading";
import { WPQTInput } from "../../../../common/Input/Input";

type UserAssignementSelectionProps = {
  task: Task;
  onUserAdd: (user: User | WPUser) => void;
  onUserDelete: (user: User | WPUser) => void;
};

type TypeFilter = "all" | UserTypes.QUICKTASKER | UserTypes.WP_USER;

const rowKey = (user: User | WPUser) => `${user.user_type}-${user.id}`;

function UserAssignementSelection({
  task,
  onUserAdd,
  onUserDelete,
}: UserAssignementSelectionProps) {
  const {
    state: { users, wpUsers },
  } = useContext(UserContext);
  const { handleExecutedAutomations } = useAutomationActions();
  const { dispatch } = useContext(ActivePipelineContext);
  const [loadingKey, setLoadingKey] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchesSearch = (user: User | WPUser) =>
    !normalizedSearch ||
    (user.name ?? "").toLowerCase().includes(normalizedSearch);

  const matchesTypeFilter = (user: User | WPUser) =>
    typeFilter === "all" || user.user_type === typeFilter;

  const isAssigned = (user: User | WPUser) => {
    if (isWPUser(user)) {
      return (task.assigned_wp_users ?? []).some((u) => u.id === user.id);
    }
    return (task.assigned_users ?? []).some((u) => u.id === user.id);
  };

  const combinedUsers: (User | WPUser)[] = [...wpUsers, ...users];
  const filteredUsers = combinedUsers
    .filter(matchesTypeFilter)
    .filter(matchesSearch);
  const sortedUsers = [
    ...filteredUsers.filter(isAssigned),
    ...filteredUsers.filter((u) => !isAssigned(u)),
  ];

  const assignUser = async (user: User | WPUser) => {
    try {
      setLoadingKey(rowKey(user));
      const userType = user.user_type;
      const response = await assignTaskToUserRequest(
        user.id,
        task.id,
        userType,
      );

      dispatch({
        type: PIPELINE_ADD_USER_TO_TASK,
        payload: {
          taskId: task.id,
          user,
        },
      });
      onUserAdd(user);
      handleExecutedAutomations(response.data.executedAutomations, task.id);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to assign user", "quicktasker"));
    } finally {
      setLoadingKey(null);
    }
  };

  const removeUser = async (user: User | WPUser) => {
    try {
      setLoadingKey(rowKey(user));
      const userType = user.user_type;
      const response = await removeTaskFromUserRequest(
        user.id,
        task.id,
        userType,
      );
      dispatch({
        type: PIPELINE_REMOVE_USER_FROM_TASK,
        payload: {
          taskId: task.id,
          userId: user.id,
          userType,
        },
      });
      onUserDelete(user);
      handleExecutedAutomations(response.data.executedAutomations, task.id);
    } catch (error) {
      console.error(error);
      toast.error(__("Failed to remove user", "quicktasker"));
    } finally {
      setLoadingKey(null);
    }
  };

  const toggleUser = (user: User | WPUser) => {
    if (loadingKey) return;
    if (isAssigned(user)) {
      removeUser(user);
    } else {
      assignUser(user);
    }
  };

  const filterPills: {
    value: TypeFilter;
    label: string;
    testId: string;
  }[] = [
    { value: "all", label: __("All", "quicktasker"), testId: "filter-all" },
    {
      value: UserTypes.WP_USER,
      label: __("WordPress", "quicktasker"),
      testId: "filter-wp-user",
    },
    {
      value: UserTypes.QUICKTASKER,
      label: __("Quicktaskers", "quicktasker"),
      testId: "filter-quicktasker",
    },
  ];

  return (
    <div className="wpqt-flex wpqt-w-[320px] wpqt-flex-col">
      <div onClick={(e) => e.stopPropagation()} className="wpqt-mb-2">
        <WPQTInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={__("Search", "quicktasker")}
          leftIcon={<MagnifyingGlassIcon className="wpqt-size-4" />}
          wrapperClassName="wpqt-block wpqt-w-full"
          className="wpqt-w-full"
        />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="wpqt-mb-2 wpqt-flex wpqt-gap-1"
        data-testid="user-assignment-filter"
      >
        {filterPills.map((pill) => {
          const active = typeFilter === pill.value;
          return (
            <button
              key={pill.value}
              type="button"
              data-testid={pill.testId}
              data-active={active}
              onClick={() => setTypeFilter(pill.value)}
              className={`wpqt-cursor-pointer wpqt-rounded-full wpqt-border wpqt-border-solid wpqt-px-3 wpqt-py-1 wpqt-text-xs ${
                active
                  ? "wpqt-border-blue-600 wpqt-bg-blue-50 wpqt-text-blue-700"
                  : "wpqt-border-qtBorder wpqt-bg-white wpqt-text-gray-700 hover:wpqt-bg-gray-100"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
      <div data-testid="user-assignment-list">
        {sortedUsers.map((user) => {
          const assigned = isAssigned(user);
          const rowLoading = loadingKey === rowKey(user);
          const disabled = loadingKey !== null;
          return (
            <div
              key={rowKey(user)}
              data-testid={
                assigned
                  ? "user-assignment-row-assigned"
                  : "user-assignment-row"
              }
              onClick={(e) => {
                e.stopPropagation();
                toggleUser(user);
              }}
              className={`wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-px-2 wpqt-py-1 ${
                disabled
                  ? "wpqt-cursor-not-allowed wpqt-opacity-60"
                  : "wpqt-cursor-pointer hover:wpqt-bg-gray-100"
              }`}
            >
              <span className="wpqt-shrink-0">
                {user.user_type === UserTypes.WP_USER ? (
                  <WordPressIcon size={20} />
                ) : (
                  <QuickTaskerIcon />
                )}
              </span>
              <div className="wpqt-flex wpqt-flex-col">
                <div>{user.name}</div>
                {user.description && (
                  <div className="wpqt-italic">{user.description}</div>
                )}
                {isWPUser(user) && user.roles?.length > 0 && (
                  <div>{user.roles.join(",")}</div>
                )}
              </div>
              <span className="wpqt-ml-auto wpqt-flex wpqt-size-5 wpqt-items-center wpqt-justify-center">
                {rowLoading ? (
                  <LoadingOval width="16" height="16" />
                ) : (
                  assigned && (
                    <CheckIcon className="wpqt-icon-green wpqt-size-5" />
                  )
                )}
              </span>
            </div>
          );
        })}
        {sortedUsers.length === 0 && (
          <div className="wpqt-px-2 wpqt-py-1">
            {__("No users found", "quicktasker")}
          </div>
        )}
      </div>
    </div>
  );
}
export { UserAssignementSelection, type UserAssignementSelectionProps };
