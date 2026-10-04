import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import {
  CHANGE_USER_SETTINGS_MODAL_OPEN,
  SET_FULL_PAGE_LOADING,
} from "../../constants";
import { AppContext, initialState } from "../../providers/AppContextProvider";
import { LoadingContext } from "../../providers/LoadingContextProvider";
import { ModalContext } from "../../providers/ModalContextProvider";
import { UserContext } from "../../providers/UserContextProvider";

jest.mock("../Page/Page", () => ({
  Page: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock("../../components/common/Header/Header", () => ({
  WPQTPageHeader: ({
    children,
    rightSideContent,
  }: {
    children: React.ReactNode;
    rightSideContent?: React.ReactNode;
  }) => (
    <div>
      <h1>{children}</h1>
      {rightSideContent}
    </div>
  ),
}));

jest.mock("../../components/Tab/WPQTTabs", () => ({
  WPQTTabs: ({ tabs }: { tabs: { name: string }[] }) => (
    <div data-testid="tabs">
      {tabs.map((tab) => (
        <span key={tab.name}>{tab.name}</span>
      ))}
    </div>
  ),
}));

jest.mock(
  "../../components/Modal/UsersSettingsModal/UsersSettingsModal",
  () => ({
    UsersSettingsModal: () => null,
  }),
);

jest.mock("../../components/Loading/Loading", () => ({
  LoadingOval: () => <div data-testid="loading-oval" />,
}));

jest.mock("./QuickTaskersSection/QuickTaskersSection", () => ({
  QuickTaskersSection: () => null,
}));

jest.mock("./RegularWPUserSection/ReqularWPUsersSection", () => ({
  RegularWPUsersSection: () => null,
}));

import { UserManagement } from "./UserManagement";

type CtxOverrides = {
  updateUsers?: jest.Mock;
  updateWPUsers?: jest.Mock;
  modalDispatch?: jest.Mock;
  loadingDispatch?: jest.Mock;
  isUserAllowedToManageWPUsers?: boolean;
};

function renderPage({
  updateUsers = jest.fn().mockResolvedValue(undefined),
  updateWPUsers = jest.fn().mockResolvedValue(undefined),
  modalDispatch = jest.fn(),
  loadingDispatch = jest.fn(),
  isUserAllowedToManageWPUsers = true,
}: CtxOverrides = {}) {
  const result = render(
    <AppContext.Provider
      value={{
        state: { ...initialState, isUserAllowedToManageWPUsers },
        appDispatch: jest.fn(),
      }}
    >
      <LoadingContext.Provider
        value={{ state: { fullPageLoading: false }, loadingDispatch }}
      >
        <ModalContext.Provider value={{ state: {} as never, modalDispatch }}>
          <UserContext.Provider
            value={{
              state: { users: [], wpUsers: [], usersSearchValue: "" },
              userDispatch: jest.fn(),
              updateUsers,
              updateWPUsers,
            }}
          >
            <UserManagement />
          </UserContext.Provider>
        </ModalContext.Provider>
      </LoadingContext.Provider>
    </AppContext.Provider>,
  );
  return {
    ...result,
    updateUsers,
    updateWPUsers,
    modalDispatch,
    loadingDispatch,
  };
}

describe("UserManagement", () => {
  it("fetches both user lists on mount with a full-page loader", async () => {
    let updateUsers!: jest.Mock;
    let updateWPUsers!: jest.Mock;
    let loadingDispatch!: jest.Mock;
    await act(async () => {
      ({ updateUsers, updateWPUsers, loadingDispatch } = renderPage());
    });

    expect(updateUsers).toHaveBeenCalledTimes(1);
    expect(updateWPUsers).toHaveBeenCalledTimes(1);
    expect(loadingDispatch).toHaveBeenCalledWith({
      type: SET_FULL_PAGE_LOADING,
      payload: true,
    });
    expect(loadingDispatch).toHaveBeenLastCalledWith({
      type: SET_FULL_PAGE_LOADING,
      payload: false,
    });
  });

  it("re-fetches both user lists when the refresh icon is clicked", async () => {
    let updateUsers!: jest.Mock;
    let updateWPUsers!: jest.Mock;
    await act(async () => {
      ({ updateUsers, updateWPUsers } = renderPage());
    });

    expect(updateUsers).toHaveBeenCalledTimes(1);
    expect(updateWPUsers).toHaveBeenCalledTimes(1);

    await act(async () => {
      fireEvent.click(screen.getByTestId("refresh-icon"));
    });

    expect(updateUsers).toHaveBeenCalledTimes(2);
    expect(updateWPUsers).toHaveBeenCalledTimes(2);
  });

  it("shows the loading oval while refreshing and restores the icon after", async () => {
    let resolveUsers!: () => void;
    const updateUsers = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve())
      .mockImplementationOnce(
        () =>
          new Promise<void>((r) => {
            resolveUsers = r;
          }),
      );
    const updateWPUsers = jest.fn().mockResolvedValue(undefined);

    await act(async () => {
      renderPage({ updateUsers, updateWPUsers });
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId("refresh-icon"));
    });
    expect(screen.queryByTestId("refresh-icon")).not.toBeInTheDocument();
    expect(screen.getByTestId("loading-oval")).toBeInTheDocument();

    await act(async () => {
      resolveUsers();
    });
    expect(screen.getByTestId("refresh-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-oval")).not.toBeInTheDocument();
  });

  it("opens the users settings modal when Settings is clicked", async () => {
    let modalDispatch!: jest.Mock;
    await act(async () => {
      ({ modalDispatch } = renderPage());
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Settings"));
    });

    expect(modalDispatch).toHaveBeenCalledWith({
      type: CHANGE_USER_SETTINGS_MODAL_OPEN,
      payload: true,
    });
  });

  it("shows the WordPress users and QuickTaskers tabs to WordPress admins", async () => {
    await act(async () => {
      renderPage();
    });

    expect(screen.getByText("WordPress users")).toBeInTheDocument();
    expect(screen.getByText("QuickTaskers")).toBeInTheDocument();
  });

  describe("without permission to manage WordPress users", () => {
    it("shows only the QuickTaskers tab", async () => {
      await act(async () => {
        renderPage({ isUserAllowedToManageWPUsers: false });
      });

      expect(screen.queryByText("WordPress users")).not.toBeInTheDocument();
      expect(screen.getByText("QuickTaskers")).toBeInTheDocument();
    });

    it("never fetches WordPress users, on mount or on refresh", async () => {
      let updateUsers!: jest.Mock;
      let updateWPUsers!: jest.Mock;
      await act(async () => {
        ({ updateUsers, updateWPUsers } = renderPage({
          isUserAllowedToManageWPUsers: false,
        }));
      });

      await act(async () => {
        fireEvent.click(screen.getByTestId("refresh-icon"));
      });

      expect(updateUsers).toHaveBeenCalledTimes(2);
      expect(updateWPUsers).not.toHaveBeenCalled();
    });
  });
});
