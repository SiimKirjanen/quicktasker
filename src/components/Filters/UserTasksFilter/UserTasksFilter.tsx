import { WPQTFilter } from "../WPQTFilter";
import { WPQTInput } from "../../common/Input/Input";
import { useContext } from "@wordpress/element";
import { UserTasksContext } from "../../../providers/UserTasksContextProvider";
import { SET_USER_TASKS_SEARCH_VALUE } from "../../../constants";

function UserTasksFilter() {
  const {
    state: { searchValue },
    userTasksDispatch,
  } = useContext(UserTasksContext);

  const onValueChange = (value: string) => {
    userTasksDispatch({ type: SET_USER_TASKS_SEARCH_VALUE, payload: value });
  };
  return (
    <WPQTFilter title="User tasks filtering">
      <WPQTInput value={searchValue} onChange={onValueChange} />
    </WPQTFilter>
  );
}

export { UserTasksFilter };
