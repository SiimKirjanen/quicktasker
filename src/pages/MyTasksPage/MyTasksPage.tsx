import {
  ArrowPathIcon,
  CheckCircleIcon,
  ClockIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useMemo, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getMyTasksRequest } from "../../api/api";
import { WPQTCard } from "../../components/Card/Card";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { WPQTInput } from "../../components/common/Input/Input";
import { LoadingOval } from "../../components/Loading/Loading";
import { useTimezone } from "../../hooks/useTimezone";
import { TaskFromServer } from "../../types/task";
import { Page } from "../Page/Page";

type MyTasks = {
  created: TaskFromServer[];
  assigned: TaskFromServer[] | null;
};

function MyTasksPage() {
  const [tasks, setTasks] = useState<MyTasks>({ created: [], assigned: [] });
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const filteredTasks = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return tasks;
    const matches = (task: TaskFromServer) =>
      task.name.toLowerCase().includes(query) ||
      (task.description ?? "").toLowerCase().includes(query);
    return {
      created: tasks.created.filter(matches),
      assigned: tasks.assigned ? tasks.assigned.filter(matches) : null,
    };
  }, [tasks, searchValue]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await getMyTasksRequest();
      if (res.success && res.data) {
        setTasks(res.data);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Page>
      <WPQTPageHeader
        description={__(
          "Tasks you have created and tasks assigned to you.",
          "quicktasker",
        )}
        rightSideContent={
          <div className="wpqt-flex wpqt-items-center wpqt-gap-4">
            <WPQTInput
              value={searchValue}
              onChange={(v) => setSearchValue(v)}
              placeholder={__("Search tasks", "quicktasker")}
              className="wpqt-w-52"
              wrapperClassName="!wpqt-mb-0"
              leftIcon={<MagnifyingGlassIcon className="wpqt-size-4" />}
            />
            <div className="wpqt-mx-5">
              {loading ? (
                <LoadingOval width="28" height="28" />
              ) : (
                <ArrowPathIcon
                  className="wpqt-size-7 wpqt-cursor-pointer hover:wpqt-text-qtBlueHover"
                  data-testid="refresh-icon"
                  onClick={() => fetchTasks()}
                />
              )}
            </div>
          </div>
        }
      >
        {__("My Tasks", "quicktasker")}
      </WPQTPageHeader>

      <MyTasksSection
        title={__("Tasks I created", "quicktasker")}
        tasks={filteredTasks.created}
        emptyText={__("You haven't created any tasks yet.", "quicktasker")}
        loading={loading}
      />

      {filteredTasks.assigned !== null && (
        <MyTasksSection
          title={__("Tasks assigned to me", "quicktasker")}
          tasks={filteredTasks.assigned}
          emptyText={__("No tasks assigned to you.", "quicktasker")}
          loading={loading}
        />
      )}
    </Page>
  );
}

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
                  {__("Board", "quicktasker")}: {task.pipeline_name}
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

export { MyTasksPage };
