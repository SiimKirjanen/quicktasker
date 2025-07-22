import { render, screen } from "@testing-library/react";
import { User, UserTypes, WPUser } from "../../../../../../types/user";
import { UserDetails } from "./UserDetails";

// Create helper functions for mocking test data
function createMockWPUser(overrides: Partial<WPUser> = {}): WPUser {
  return {
    id: "1",
    name: "John Doe",
    description: "Test description",
    user_type: UserTypes.WP_USER,
    profile_picture: "https://example.com/avatar.jpg",
    created_at: "2023-01-01T00:00:00Z",
    caps: ["subscriber"],
    allcaps: ["read", "subscriber"],
    roles: ["subscriber"],
    ...overrides,
  };
}

function createMockUser(overrides: Partial<User> = {}): User {
  return {
    id: "2",
    name: "Jane Smith",
    description: "Another description",
    user_type: UserTypes.QUICKTASKER,
    created_at: "2023-01-01T00:00:00Z",
    page_hash: "test-hash",
    assigned_tasks_count: "0",
    // Add these required boolean properties
    is_active: true, // Required non-optional boolean
    has_password: false, // Required non-optional boolean
    ...overrides,
  };
}

describe("UserDetails Component", () => {
  test("renders null when user is null", () => {
    const { container } = render(<UserDetails user={null} />);
    expect(container.firstChild).toBeNull();
  });

  test("renders WordPress user with profile picture", () => {
    const wpUser = createMockWPUser({
      name: "John Doe",
      description: "Test description",
      profile_picture: "https://example.com/avatar.jpg",
    });

    render(<UserDetails user={wpUser} />);

    // Check profile picture is displayed
    const profilePicture = screen.getByRole("img");
    expect(profilePicture).toBeInTheDocument();
    expect(profilePicture).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg",
    );
    expect(profilePicture).toHaveClass("wpqt-size-11", "wpqt-rounded-full");

    // Check name is displayed
    expect(screen.getByText("John Doe")).toBeInTheDocument();

    // Check description is displayed
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  test("renders Quicktasker user with user icon", () => {
    const qtUser = createMockUser({
      name: "Jane Smith",
      description: "Another description",
    });

    render(<UserDetails user={qtUser} />);

    // Check user icon is displayed (no img element)
    const profilePicture = screen.queryByRole("img");
    expect(profilePicture).not.toBeInTheDocument();

    // Check svg icon is displayed
    const svgIcon = document.querySelector("svg");
    expect(svgIcon).toBeInTheDocument();
    expect(svgIcon).toHaveClass(
      "wpqt-icon-blue",
      "wpqt-size-11",
      "wpqt-text-blue-900",
    );

    // Check name is displayed
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    // Check description is displayed
    expect(screen.getByText("Another description")).toBeInTheDocument();
  });

  test("doesn't render description when not provided", () => {
    const userWithoutDescription = createMockUser({
      id: "3",
      name: "No Description User",
      description: "", // Empty description
    });

    render(<UserDetails user={userWithoutDescription} />);

    // Check name is displayed
    expect(screen.getByText("No Description User")).toBeInTheDocument();

    // Check labels
    const labels = screen.getAllByTestId("row-label");
    const labelTexts = labels.map((label) => label.textContent);

    // Should only have "Name" label, not "Description"
    expect(labelTexts).toContain("Name");
    expect(labelTexts).not.toContain("Description");
  });

  test("applies correct styling classes to rows", () => {
    const user = createMockWPUser({
      id: "4",
      name: "Style Test User",
      description: "Test styling",
      profile_picture: "https://example.com/avatar.jpg",
    });

    render(<UserDetails user={user} />);

    // Check all rows have the correct class
    const rows = screen.getAllByTestId("display-row");
    rows.forEach((row) => {
      expect(row).toHaveClass(
        "wpqt-flex",
        "wpqt-flex-col",
        "wpqt-items-center",
        "wpqt-mb-4",
        "wpqt-gap-1",
        "wpqt-text-xl",
      );
    });
  });
});
