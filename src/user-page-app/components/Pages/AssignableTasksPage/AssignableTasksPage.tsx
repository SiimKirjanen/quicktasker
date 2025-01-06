import {
  CalendarIcon,
  CheckBadgeIcon,
  ClockIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { useNavigate } from "react-router-dom";
import { WPQTCard } from "../../../../components/Card/Card";
import { WPQTCardDataItem } from "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem";
import { useTimezone } from "../../../hooks/useTimezone";
import {
  UserAssignableTasksContext,
  UserAssignableTasksContextProvider,
} from "../../../providers/UserAssignableTasksContextProvider";
import { PageContentWrap, PageTitle, PageWrap } from "../Page/Page";

function AssignableTasksPage() {
  return (
    <UserAssignableTasksContextProvider>
      <AssignebaleTasksPageContent />
    </UserAssignableTasksContextProvider>
  );
}

function AssignebaleTasksPageContent() {
  const {
    state: { loading, assignableTasks },
    loadAssignableTasks,
  } = useContext(UserAssignableTasksContext);
  const navigate = useNavigate();
  const { convertToWPTimezone } = useTimezone();

  return (
    <PageWrap loading={loading} onRefresh={loadAssignableTasks}>
      <PageContentWrap>
        <PageTitle
          description={__("Tasks available for self-assignment", "quicktasker")}
        >
          {__("Assignable tasks", "quicktasker")}
        </PageTitle>
        <div className="wpqt-user-page-card-flex">
          {assignableTasks.map((task) => {
            const dueDate = task.due_date
              ? convertToWPTimezone(task.due_date)
              : null;

            return (
              <WPQTCard
                key={task.task_hash}
                className="wpqt-cursor-pointer wpqt-min-w-[340px]"
                title={task.name}
                description={task.description}
                onClick={() => navigate(`/tasks/${task.task_hash}`)}
              >
                <WPQTCardDataItem
                  label={__("Created", "quicktasker")}
                  value={convertToWPTimezone(task.created_at)}
                  icon={<CalendarIcon className="wpqt-size-5 wpqt-icon-blue" />}
                />

                <WPQTCardDataItem
                  label={__("Board", "quicktasker")}
                  value={
                    task.pipeline_name
                      ? task.pipeline_name
                      : __("Board is deleted!", "quicktasker")
                  }
                  icon={
                    <ViewColumnsIcon className="wpqt-size-5 wpqt-icon-blue" />
                  }
                />

                {dueDate && (
                  <WPQTCardDataItem
                    label={__("Due date", "quicktasker")}
                    value={dueDate}
                    icon={<ClockIcon className="wpqt-size-5 wpqt-icon-blue" />}
                  />
                )}

                <WPQTCardDataItem
                  label={
                    task.is_done
                      ? __("Task completed", "quicktasker")
                      : __("Task not completed", "quicktasker")
                  }
                  value={task.stage_id}
                  icon={
                    task.is_done ? (
                      <CheckBadgeIcon className="wpqt-size-5 wpqt-icon-green" />
                    ) : (
                      <CheckBadgeIcon className="wpqt-size-5 wpqt-icon-gray" />
                    )
                  }
                />
              </WPQTCard>
            );
          })}
        </div>
      </PageContentWrap>
    </PageWrap>
  );
}

export { AssignableTasksPage };
