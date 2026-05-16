import { useEffect, useMemo, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { getMyTasksRequest } from "../../api/api";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { usePipelines } from "../../hooks/usePipelines";
import { TaskFromServer } from "../../types/task";
import { Page } from "../Page/Page";
import { MyTasksHeaderControls } from "./components/MyTasksHeaderControls";
import { MyTasksSection } from "./components/MyTasksSection";

type MyTasks = {
  created: TaskFromServer[];
  assigned: TaskFromServer[] | null;
};

function MyTasksPage() {
  const [tasks, setTasks] = useState<MyTasks>({ created: [], assigned: [] });
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [boardFilter, setBoardFilter] = useState("");
  const { pipelines } = usePipelines();

  const boardOptions = useMemo(
    () => pipelines.map((p) => ({ value: p.id, label: p.name })),
    [pipelines],
  );

  const filteredTasks = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    const matches = (task: TaskFromServer) => {
      if (boardFilter && task.pipeline_id !== boardFilter) return false;
      if (!query) return true;
      return (
        task.name.toLowerCase().includes(query) ||
        (task.description ?? "").toLowerCase().includes(query)
      );
    };
    return {
      created: tasks.created.filter(matches),
      assigned: tasks.assigned ? tasks.assigned.filter(matches) : null,
    };
  }, [tasks, searchValue, boardFilter]);

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
          <MyTasksHeaderControls
            boardOptions={boardOptions}
            boardFilter={boardFilter}
            onBoardFilterChange={setBoardFilter}
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            loading={loading}
            onRefresh={fetchTasks}
          />
        }
      >
        {__("My Tasks", "quicktasker")}
      </WPQTPageHeader>

      <MyTasksSection
        title={__("Tasks I created", "quicktasker")}
        tasks={filteredTasks.created}
        emptyText={
          boardFilter
            ? __("You haven't created any tasks in this board.", "quicktasker")
            : __("You haven't created any tasks yet.", "quicktasker")
        }
        loading={loading}
      />

      {filteredTasks.assigned !== null && (
        <MyTasksSection
          title={__("Tasks assigned to me", "quicktasker")}
          tasks={filteredTasks.assigned}
          emptyText={
            boardFilter
              ? __("No tasks assigned to you in this board.", "quicktasker")
              : __("No tasks assigned to you.", "quicktasker")
          }
          loading={loading}
        />
      )}
    </Page>
  );
}

export { MyTasksPage };
