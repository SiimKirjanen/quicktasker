import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  SET_STAGE_FILTER,
  SET_TASK_VIEW_SEARCH_TEXT,
  SET_USER_FILTER,
} from "../../../constants";
import { useActivePipeline } from "../../../hooks/useActivePipeline";
import { useUser } from "../../../hooks/useUser";
import { ActivePipelineTaskViewContext } from "../../../providers/ActivePipelineTaskViewContextProvider";
import { UserTypes } from "../../../types/user";
import { userTypeStrings } from "../../../utils/user";
import { WPQTInput } from "../../common/Input/Input";
import { WPQTSelect } from "../../common/Select/WPQTSelect";
import { WPQTFilter, WPQTFilterSection } from "../WPQTFilter";

function TasksViewFilter() {
  const {
    state: { stageIdFilter, userFilter, searchText },
    taskViewDispatch,
  } = useContext(ActivePipelineTaskViewContext);
  const { stageOptions } = useActivePipeline();
  const { combinedUsers } = useUser();
  const userOptions = combinedUsers.map((user) => {
    return {
      value: `${user.id}:${user.user_type}`,
      label: `${user.name} (${userTypeStrings[user.user_type]})`,
    };
  });
  const selectedUserOption =
    userFilter.id && userFilter.type
      ? `${userFilter.id}:${userFilter.type}`
      : "";

  const onStageSelectionChange = (selectedStageId: string) => {
    taskViewDispatch({
      type: SET_STAGE_FILTER,
      payload: selectedStageId,
    });
  };

  const onUserSelectionChange = (selectedUserOption: string) => {
    const [userId, userType] = selectedUserOption.split(":");

    taskViewDispatch({
      type: SET_USER_FILTER,
      payload: {
        id: userId,
        type: userType as UserTypes,
      },
    });
  };

  const onSearchChange = (newValue: string) => {
    taskViewDispatch({
      type: SET_TASK_VIEW_SEARCH_TEXT,
      payload: newValue,
    });
  };

  return (
    <WPQTFilter
      title={__("Filter tasks", "quicktasker")}
      searchChildren={
        <WPQTFilterSection
          title={__("Search", "quicktasker")}
          labelIdFor="task-view-search"
        >
          <WPQTInput
            inputId="task-view-search"
            value={searchText}
            onChange={onSearchChange}
          />
        </WPQTFilterSection>
      }
    >
      <WPQTFilterSection title={__("Stage", "quicktasker")}>
        <WPQTSelect
          id="task-view-stage-filter"
          allSelectorLabel={__("All stages", "quicktasker")}
          selectedOptionValue={stageIdFilter}
          options={stageOptions}
          onSelectionChange={onStageSelectionChange}
        />
      </WPQTFilterSection>
      <WPQTFilterSection title={__("Assigned user", "quicktasker")}>
        <WPQTSelect
          id="task-view-assigned-user-filter"
          allSelectorLabel={__("All users", "quicktasker")}
          selectedOptionValue={selectedUserOption}
          options={userOptions}
          onSelectionChange={onUserSelectionChange}
        />
      </WPQTFilterSection>
    </WPQTFilter>
  );
}

export { TasksViewFilter };
