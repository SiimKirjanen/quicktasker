import { useContext } from "@wordpress/element";
import { ActivePipelineTaskViewContext } from "../../providers/ActivePipelineTaskViewContextProvider";
import { Task } from "../../types/task";
import { UserTypes } from "../../types/user";

const useTaskFilter = () => {
  const {
    state: { stageIdFilter, userFilter, searchText },
  } = useContext(ActivePipelineTaskViewContext);

  const taskViewFilter = (task: Task) => {
    const matchesStageIdFilter =
      !stageIdFilter || task.stage_id === stageIdFilter;

    const matchesUserFilter =
      !userFilter.id ||
      !userFilter.type ||
      (userFilter.type === UserTypes.QUICKTASKER &&
        task.assigned_users?.some((user) => user.id === userFilter.id)) ||
      (userFilter.type === UserTypes.WP_USER &&
        task.assigned_wp_users?.some((user) => user.id === userFilter.id));

    const matchesSearchText =
      !searchText ||
      task.name.toLowerCase().includes(searchText.toLowerCase()) ||
      (task.description?.toLowerCase().includes(searchText.toLowerCase()) ??
        false);

    return matchesStageIdFilter && matchesUserFilter && matchesSearchText;
  };

  return {
    taskViewFilter,
  };
};

export { useTaskFilter };
