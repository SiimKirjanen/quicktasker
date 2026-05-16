import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { WPQTCard } from "../../../components/Card/Card";
import { useTimezone } from "../../../hooks/useTimezone";
import { TaskFromServer } from "../../../types/task";

type SectionProps = {
  title: string;
  tasks: TaskFromServer[];
  emptyText: string;
  loading: boolean;
};

function MyTasksSection({ title, tasks, emptyText, loading }: SectionProps) {
  const { convertToWPTimezone } = useTimezone();
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
            >
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
              <div className="wpqt-flex wpqt-items-center wpqt-gap-1 wpqt-text-xs wpqt-mt-1">
                {task.is_done === "1" ? (
                  <>
                    <CheckCircleIcon className="wpqt-size-4 wpqt-text-green-600" />
                    <span className="wpqt-text-green-600">
                      {task.task_completed_at
                        ? `${__("Done", "quicktasker")}: ${convertToWPTimezone(task.task_completed_at)}`
                        : __("Done", "quicktasker")}
                    </span>
                  </>
                ) : (
                  <>
                    <ClockIcon className="wpqt-size-4 wpqt-text-gray-500" />
                    <span className="wpqt-text-gray-500">
                      {__("In progress", "quicktasker")}
                    </span>
                  </>
                )}
              </div>
              <div className="wpqt-text-xs wpqt-text-gray-500 wpqt-mt-1">
                {__("Created", "quicktasker")}:{" "}
                {convertToWPTimezone(task.created_at)}
              </div>
            </WPQTCard>
          ))}
        </div>
      )}
    </div>
  );
}

export { MyTasksSection };
