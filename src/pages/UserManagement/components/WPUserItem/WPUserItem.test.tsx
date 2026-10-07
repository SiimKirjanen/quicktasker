import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { toast } from "react-toastify";

jest.mock("react-toastify", () => ({
  toast: { warning: jest.fn() },
}));

const mockUpdateWPUserCapabilities = jest.fn();
jest.mock("../../../../hooks/actions/useCapabilityActions", () => ({
  useCapabilityActions: () => ({
    updateWPUserCapabilities: mockUpdateWPUserCapabilities,
  }),
}));

jest.mock("../../../../components/Card/Card", () => ({
  WPQTCard: ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div>
      <span>{title}</span>
      {children}
    </div>
  ),
}));
jest.mock(
  "../../../../components/Card/WPQTCardDataItem/WPQTCardDataItem",
  () => ({
    WPQTCardDataItem: ({ label, value }: { label: string; value?: string }) => (
      <div>
        <span>{label}</span>
        <span>{value}</span>
      </div>
    ),
  }),
);
jest.mock("../../../../components/common/Toggle/Toggle", () => ({
  Toggle: ({
    checked,
    handleChange,
    disabled,
    dataTestId,
  }: {
    checked: boolean;
    handleChange: (v: boolean) => void;
    disabled?: boolean;
    dataTestId?: string;
  }) => (
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      data-testid={dataTestId}
      onChange={(e) => handleChange(e.target.checked)}
    />
  ),
}));
jest.mock("../../../../components/Loading/Loading", () => ({
  Loading: () => <div data-testid="loading-spinner" />,
}));
jest.mock("./WPUserPipelineAccess/WPUserPipelineAccess", () => ({
  WPUserPipelineAccess: () => <div data-testid="wp-user-boards" />,
}));

import {
  AppContext,
  initialState,
} from "../../../../providers/AppContextProvider";
import { PipelinesContext } from "../../../../providers/PipelinesContextProvider";
import { Pipeline } from "../../../../types/pipeline";
import {
  UserTypes,
  WPUser,
  WPUserCapabilitiesUpdate,
} from "../../../../types/user";
import { WPUserItem } from "./WPUserItem";

function makeWPUser(allcaps: Record<string, boolean> = {}): WPUser {
  return {
    id: "wp1",
    name: "Bob",
    description: "Desc",
    created_at: "2024-01-01T00:00:00Z",
    caps: [],
    allcaps: allcaps as unknown as string[],
    roles: ["editor"],
    user_type: UserTypes.WP_USER,
    profile_picture: "",
  };
}

function renderAsCurrentUser(user: WPUser, currentUserId: string) {
  return render(
    <AppContext.Provider
      value={{
        state: { ...initialState, currentUserId },
        appDispatch: () => {},
      }}
    >
      <WPUserItem user={user} />
    </AppContext.Provider>,
  );
}

beforeEach(() => {
  jest.clearAllMocks();
  mockUpdateWPUserCapabilities.mockResolvedValue(undefined);
});

// Toggles appear in this DOM order:
// 0: quicktasker_admin_role
// 1: quicktasker_admin_role_manage_users
// 2: quicktasker_admin_role_manage_settings
// 3: quicktasker_admin_role_manage_archive
// 4: quicktasker_access_user_page_app
// 5: quicktasker_admin_role_allow_delete
// 6: quicktasker_view_my_tasks

describe("WPUserItem", () => {
  describe("capability initialisation from allcaps", () => {
    it("marks capabilities as false when allcaps is empty", () => {
      render(<WPUserItem user={makeWPUser()} />);
      const checkboxes = screen.getAllByRole("checkbox");
      checkboxes.forEach((cb) => expect(cb).not.toBeChecked());
    });

    it("marks capability as true when the key is present in allcaps", () => {
      render(
        <WPUserItem
          user={makeWPUser({
            quicktasker_admin_role: true,
            quicktasker_access_user_page_app: true,
          })}
        />,
      );
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes[0]).toBeChecked();
      expect(checkboxes[1]).not.toBeChecked();
      expect(checkboxes[4]).toBeChecked();
    });
  });

  describe("optimistic toggle update", () => {
    it("calls updateWPUserCapabilities with updated capability on toggle", async () => {
      render(<WPUserItem user={makeWPUser()} />);
      const checkboxes = screen.getAllByRole("checkbox");

      await act(async () => {
        fireEvent.click(checkboxes[0]);
      });

      expect(mockUpdateWPUserCapabilities).toHaveBeenCalledTimes(1);
      const [userId, settings] = mockUpdateWPUserCapabilities.mock.calls[0];
      expect(userId).toBe("wp1");
      expect(settings.quicktasker_admin_role).toBe(true);
    });

    it("optimistically checks the toggle before the async call resolves", async () => {
      let resolve: () => void;
      mockUpdateWPUserCapabilities.mockReturnValue(
        new Promise<void>((r) => {
          resolve = r;
        }),
      );

      render(<WPUserItem user={makeWPUser()} />);
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes[0]).not.toBeChecked();

      act(() => {
        fireEvent.click(checkboxes[0]);
      });

      expect(checkboxes[0]).toBeChecked();

      await act(async () => {
        resolve!();
      });
    });
  });

  describe("rollback on failure", () => {
    it("restores previous capability state when onFailureCallback is invoked", async () => {
      mockUpdateWPUserCapabilities.mockImplementation(
        async (
          _id: string,
          _settings: unknown,
          _onSuccess: () => void,
          onFailure: () => void,
        ) => {
          onFailure();
        },
      );

      render(
        <WPUserItem user={makeWPUser({ quicktasker_admin_role: true })} />,
      );
      const checkboxes = screen.getAllByRole("checkbox");
      expect(checkboxes[0]).toBeChecked();

      await act(async () => {
        fireEvent.click(checkboxes[0]);
      });

      expect(checkboxes[0]).toBeChecked();
    });
  });

  it("shows loading spinner while update is in progress", async () => {
    let resolve: () => void;
    mockUpdateWPUserCapabilities.mockReturnValue(
      new Promise<void>((r) => {
        resolve = r;
      }),
    );

    render(<WPUserItem user={makeWPUser()} />);
    expect(screen.queryByTestId("loading-spinner")).toBeNull();

    act(() => {
      fireEvent.click(screen.getAllByRole("checkbox")[0]);
    });

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();

    await act(async () => {
      resolve!();
    });

    expect(screen.queryByTestId("loading-spinner")).toBeNull();
  });

  describe("API tokens and webhooks that stop working", () => {
    function respondWithStopped(
      stopped: WPUserCapabilitiesUpdate["stopped_integrations"],
      stoppedTokenDeletes: WPUserCapabilitiesUpdate["stopped_token_deletes"] = [],
    ) {
      mockUpdateWPUserCapabilities.mockImplementation(
        async (
          _id: string,
          _settings: unknown,
          onSuccess: (update: WPUserCapabilitiesUpdate) => void,
        ) =>
          onSuccess({
            stopped_integrations: stopped,
            stopped_token_deletes: stoppedTokenDeletes,
          }),
      );
    }

    function renderWithBoards(user: WPUser) {
      return render(
        <PipelinesContext.Provider
          value={{
            state: {
              pipelines: [{ id: "1", name: "Board 1" }] as Pipeline[],
            },
            pipelinesDispatch: jest.fn(),
          }}
        >
          <WPUserItem user={user} />
        </PipelinesContext.Provider>,
      );
    }

    it("warns when turning off a permission stops them", async () => {
      respondWithStopped([
        { pipeline_id: 1, api_token_count: 1, webhook_count: 2 },
      ]);
      renderWithBoards(
        makeWPUser({
          quicktasker_admin_role: true,
          quicktasker_admin_role_manage_settings: true,
        }),
      );

      await act(async () => {
        fireEvent.click(screen.getAllByRole("checkbox")[2]);
      });

      expect(toast.warning).toHaveBeenCalledWith(expect.anything(), {
        autoClose: false,
      });
      render((toast.warning as jest.Mock).mock.calls[0][0]);
      expect(
        screen.getByTestId("stopped-integrations-warning"),
      ).toHaveTextContent(
        "1 API token and 2 webhooks by Bob on Board 1 won't work without access to manage settings.",
      );
      expect(screen.getByText("Open API tokens")).toHaveAttribute(
        "href",
        "#/board/1/api-tokens",
      );
      expect(screen.getByText("Open webhooks")).toHaveAttribute(
        "href",
        "#/board/1/webhooks",
      );
    });

    it("warns when turning off the permission to delete stops API tokens deleting", async () => {
      respondWithStopped(
        [],
        [{ pipeline_id: 1, api_token_count: 2, webhook_count: 0 }],
      );
      renderWithBoards(
        makeWPUser({
          quicktasker_admin_role: true,
          quicktasker_admin_role_allow_delete: true,
        }),
      );

      await act(async () => {
        fireEvent.click(screen.getByTestId("wp-user-allow-delete-toggle"));
      });

      expect(toast.warning).toHaveBeenCalledTimes(1);
      render((toast.warning as jest.Mock).mock.calls[0][0]);
      expect(
        screen.getByTestId("stopped-integrations-warning"),
      ).toHaveTextContent(
        "2 API tokens by Bob on Board 1 can't delete without access to delete resources.",
      );
      expect(screen.getByText("Open API tokens")).toHaveAttribute(
        "href",
        "#/board/1/api-tokens",
      );
      expect(screen.queryByText("Open webhooks")).toBeNull();
    });

    it("does not warn when nothing stopped working", async () => {
      respondWithStopped([]);
      renderWithBoards(makeWPUser({ quicktasker_admin_role: true }));

      await act(async () => {
        fireEvent.click(screen.getAllByRole("checkbox")[3]);
      });

      expect(mockUpdateWPUserCapabilities).toHaveBeenCalledTimes(1);
      expect(toast.warning).not.toHaveBeenCalled();
    });
  });

  describe("own user card", () => {
    it("disables every toggle and shows a notice on the current user's card", () => {
      renderAsCurrentUser(
        makeWPUser({
          quicktasker_admin_role: true,
          quicktasker_admin_role_manage_users: true,
        }),
        "wp1",
      );

      screen
        .getAllByRole("checkbox")
        .forEach((cb) => expect(cb).toBeDisabled());
      expect(
        screen.getByTestId("wp-user-own-permissions-notice"),
      ).toBeInTheDocument();
    });

    it("does not send an update when a toggle on the own card changes", async () => {
      renderAsCurrentUser(makeWPUser(), "wp1");

      await act(async () => {
        fireEvent.click(screen.getAllByRole("checkbox")[0]);
      });

      expect(mockUpdateWPUserCapabilities).not.toHaveBeenCalled();
    });

    it("keeps toggles enabled and hides the notice on other users' cards", () => {
      renderAsCurrentUser(makeWPUser({ quicktasker_admin_role: true }), "wp2");

      screen.getAllByRole("checkbox").forEach((cb) => expect(cb).toBeEnabled());
      expect(screen.queryByTestId("wp-user-own-permissions-notice")).toBeNull();
    });
  });
});
