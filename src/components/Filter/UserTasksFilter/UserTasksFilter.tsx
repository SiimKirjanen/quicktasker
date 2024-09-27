import { WPQTFilter } from "../WPQTFilter";
import { WPQTInput } from "../../common/Input/Input";
import { useContext } from "@wordpress/element";
import { UserTasksContext } from "../../../providers/UserTasksContextProvider";
import {
  SET_USER_TASKS_FILTERED_PIPELINE,
  SET_USER_TASKS_SEARCH_VALUE,
} from "../../../constants";
import { PipelineFilterSelect } from "../../common/Select/PipelineFilterSelect/PipelineFilterSelect";

function UserTasksFilter() {
  const {
    state: { searchValue, filteredPipelineId },
    userTasksDispatch,
  } = useContext(UserTasksContext);

  const onValueChange = (value: string) => {
    userTasksDispatch({ type: SET_USER_TASKS_SEARCH_VALUE, payload: value });
  };
  const onPipelineChange = (pipelineId: string) => {
    userTasksDispatch({
      type: SET_USER_TASKS_FILTERED_PIPELINE,
      payload: pipelineId,
    });
  };
  return (
    <WPQTFilter title="User tasks filtering">
      <WPQTInput value={searchValue} onChange={onValueChange} />
      <PipelineFilterSelect
        selectedOptionValue={filteredPipelineId}
        selectionChange={onPipelineChange}
      />
    </WPQTFilter>
  );
}

export { UserTasksFilter };
