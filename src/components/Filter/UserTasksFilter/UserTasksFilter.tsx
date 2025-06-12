import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  SET_USER_TASKS_FILTERED_PIPELINE,
  SET_USER_TASKS_SEARCH_VALUE,
} from "../../../constants";
import { UserTasksContext } from "../../../providers/UserTasksContextProvider";
import { WPQTInput } from "../../common/Input/Input";
import { PipelineFilterSelect } from "../../common/Select/PipelineFilterSelect/PipelineFilterSelect";
import { WPQTFilter, WPQTFilterSection } from "../WPQTFilter";

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
    <WPQTFilter
      title={__("Filter tasks", "quicktasker")}
      searchChildren={
        <WPQTFilterSection
          title={__("Search", "quicktasker")}
          labelIdFor="user-tasks-search"
        >
          <WPQTInput
            inputId="user-tasks-search"
            value={searchValue}
            onChange={onValueChange}
            className="!wpqt-mb-0"
          />
        </WPQTFilterSection>
      }
    >
      <WPQTFilterSection title={__("Board", "quicktasker")}>
        <PipelineFilterSelect
          selectedOptionValue={filteredPipelineId}
          selectionChange={onPipelineChange}
        />
      </WPQTFilterSection>
    </WPQTFilter>
  );
}

export { UserTasksFilter };
