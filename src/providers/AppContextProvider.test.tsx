import { render } from "@testing-library/react";
import { useContext, useEffect } from "@wordpress/element";
import {
  AppContext,
  AppContextProvider,
  initialState,
  State,
} from "./AppContextProvider";

const wpqt = {
  siteURL: "https://site",
  publicUserPageId: "5",
  timezone: "UTC",
  currentUserId: "7",
  isUserAllowedToDelete: "1",
  isUserAllowedToManageSettings: "0",
  isUserAllowedToManageUsers: "1",
  isUserAllowedToDeleteUsers: "0",
  isUserAllowedToManageWPUsers: "1",
  userPageCustomStyles: ".x{}",
  pluginURL: "https://plugin",
  taskUploadsURL: "https://uploads",
} as Window["wpqt"];

describe("AppContextProvider", () => {
  beforeEach(() => {
    window.wpqt = wpqt;
  });

  it("fills the state from window.wpqt before child mount effects run", () => {
    let stateInMountEffect: State | undefined;
    function Child() {
      const { state } = useContext(AppContext);
      useEffect(() => {
        stateInMountEffect = state;
      }, []);
      return null;
    }

    render(
      <AppContextProvider>
        <Child />
      </AppContextProvider>,
    );

    expect(stateInMountEffect).toEqual({
      ...initialState,
      siteURL: "https://site",
      publicUserPageId: "5",
      timezone: "UTC",
      currentUserId: "7",
      isUserAllowedToDelete: true,
      isUserAllowedToManageSettings: false,
      isUserAllowedToManageUsers: true,
      isUserAllowedToDeleteUsers: false,
      isUserAllowedToManageWPUsers: true,
      userPageCustomStyles: ".x{}",
      pluginURL: "https://plugin",
      taskUploadsURL: "https://uploads",
    });
  });
});
