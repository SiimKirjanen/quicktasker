import { SET_USER_PAGE_STATUS } from "../constants";
import { Action, State } from "../providers/UserPageAppContextProvider";
import {
  ServerUserPageStatus,
  UserPageStatus,
} from "../types/user-page-status";

const transformServerUserPageStatus = (
  serverPageStatus: ServerUserPageStatus,
): UserPageStatus => ({
  ...serverPageStatus,
  isActiveUser: serverPageStatus.isActiveUser === "1",
});

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_USER_PAGE_STATUS: {
      const serverUserPageStatus = action.payload;
      const userPageStatus: UserPageStatus =
        transformServerUserPageStatus(serverUserPageStatus);

      return {
        ...state,
        ...userPageStatus,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export { reducer };
