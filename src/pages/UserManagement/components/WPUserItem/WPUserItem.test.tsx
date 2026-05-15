import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";

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
  }: {
    checked: boolean;
    handleChange: (v: boolean) => void;
  }) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => handleChange(e.target.checked)}
    />
  ),
}));
jest.mock("../../../../components/Loading/Loading", () => ({
  Loading: () => <div data-testid="loading-spinner" />,
}));

import { UserTypes, WPUser } from "../../../../types/user";
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
});
