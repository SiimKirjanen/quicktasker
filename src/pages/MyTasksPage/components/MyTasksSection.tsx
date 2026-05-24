import {
  ChatBubbleLeftEllipsisIcon,
  CheckBadgeIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../components/Card/Card";
import { WPQTTag } from "../../../components/common/Tag/Tag";
import { DueDateInfo } from "../../../components/Icon/DueDateInfo/DueDateInfo";
import {
  OPEN_TASK_COMMENTS_MODAL,
  TASK_FOCUS_BORDER_STYLE,
  TASK_FOCUS_BORDER_WIDTH,
} from "../../../constants";
import { useTimezone } from "../../../hooks/useTimezone";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { Task, TaskFromServer } from "../../../types/task";

type SectionProps = {
  title: string;
  tasks: TaskFromServer[];
  emptyText: string;
  loading: boolean;
};

function MyTasksSection({ title, tasks, emptyText, loading }: SectionProps) {
  const { convertToWPTimezone } = useTimezone();
  const { modalDispatch } = useContext(ModalContext);
  return (
    <div className="wpqt-mt-6">
      <h2 className="wpqt-text-lg wpqt-font-semibold wpqt-mb-3">{title}</h2>
      {loading ? (
        <p className="wpqt-text-sm wpqt-text-gray-500">
          {__("Loading…", "quicktasker")}
        </p>
      ) : tasks.length === 0 ? (
        <p className="wpqt-text-sm wpqt-text-gray-500">{emptyText}</p>
      ) : (
        <div className="wpqt-card-grid">
          {tasks.map((task) => (
            <WPQTCard
              key={task.id}
              title={task.name}
              description={task.description}
              style={
                task.task_focus_color
                  ? {
                      borderTopColor: task.task_focus_color,
                      borderTopWidth: TASK_FOCUS_BORDER_WIDTH,
                      borderTopStyle: TASK_FOCUS_BORDER_STYLE,
                    }
                  : undefined
              }
            >
              <div className="wpqt-flex wpqt-justify-end">
                <button
                  type="button"
                  data-testid="task-comments-button"
                  aria-label={__("View comments", "quicktasker")}
                  onClick={() =>
                    modalDispatch({
                      type: OPEN_TASK_COMMENTS_MODAL,
                      payload: { taskId: task.id },
                    })
                  }
                  className="wpqt-bg-transparent wpqt-border-0 wpqt-p-1 wpqt-cursor-pointer wpqt-text-gray-500 hover:wpqt-text-qtBlueHover"
                >
                  <ChatBubbleLeftEllipsisIcon className="wpqt-size-5" />
                </button>
              </div>
              {task.pipeline_name && (
                <div className="wpqt-text-xs wpqt-text-gray-500 wpqt-mt-2">
                  {__("Board", "quicktasker")}:{" "}
                  <a
                    href={`admin.php?page=wp-quicktasker#/board/${task.pipeline_id}`}
                    className="wpqt-text-qtBlue hover:wpqt-text-qtBlueHover"
                  >
                    {task.pipeline_name}
                  </a>
                </div>
              )}
              {task.stage_name && (
                <div className="wpqt-text-xs wpqt-text-gray-500 wpqt-mt-1">
                  {__("Stage", "quicktasker")}: {task.stage_name}
                </div>
              )}
              <div className="wpqt-text-xs wpqt-text-gray-500 wpqt-mt-1">
                {__("Created", "quicktasker")}:{" "}
                {convertToWPTimezone(task.created_at)}
              </div>
              {(() => {
                const users = [
                  ...(task.assigned_users || []),
                  ...(task.assigned_wp_users || []),
                ];
                if (users.length === 0) return null;
                return (
                  <div className="wpqt-flex wpqt-items-start wpqt-gap-1 wpqt-text-xs wpqt-text-gray-500 wpqt-mt-2">
                    <UserCircleIcon className="wpqt-size-5 wpqt-text-blue-400 wpqt-shrink-0" />
                    <div className="wpqt-flex wpqt-flex-wrap wpqt-gap-x-1">
                      {users.map((user, index) => (
                        <span key={index}>
                          {user.name}
                          {index < users.length - 1 && ","}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}
              {Array.isArray(task.assigned_labels) &&
                task.assigned_labels.length > 0 && (
                  <div className="wpqt-flex wpqt-flex-wrap wpqt-gap-1 wpqt-mt-2">
                    {task.assigned_labels.map((label) => (
                      <WPQTTag
                        key={label.id}
                        inlineStyle={{ backgroundColor: label.color }}
                      >
                        {label.name}
                      </WPQTTag>
                    ))}
                  </div>
                )}
              <div className="wpqt-flex wpqt-items-center wpqt-gap-1 wpqt-text-xs wpqt-mt-3">
                {task.is_done === "1" ? (
                  <>
                    <CheckBadgeIcon className="wpqt-size-5 wpqt-icon-green" />
                    <span className="wpqt-text-green-600">
                      {task.task_completed_at
                        ? `${__("Done", "quicktasker")}: ${convertToWPTimezone(task.task_completed_at)}`
                        : __("Done", "quicktasker")}
                    </span>
                  </>
                ) : (
                  <>
                    <CheckBadgeIcon className="wpqt-size-5 wpqt-text-gray-500" />
                    <span className="wpqt-text-gray-500">
                      {__("In progress", "quicktasker")}
                    </span>
                  </>
                )}
              </div>
              {task.due_date && (
                <div className="wpqt-mt-1">
                  <DueDateInfo task={task as unknown as Task} />
                </div>
              )}
            </WPQTCard>
          ))}
        </div>
      )}
    </div>
  );
}

export { MyTasksSection };
