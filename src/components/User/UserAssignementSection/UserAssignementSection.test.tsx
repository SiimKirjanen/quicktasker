import { fireEvent, render, screen } from "@testing-library/react";
import { User, UserTypes, WPUser } from "../../../types/user";
import { UserAssignementSection } from "./UserAssignementSection";

// Mock ActionIcon
const MockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg data-testid="mock-icon" {...props} />
);

const baseUser: User = {
  id: "1",
  name: "John Doe",
  description: "A user",
  created_at: "2023-01-01T00:00:00Z",
  page_hash: "hash123",
  assigned_tasks_count: "0",
  user_type: UserTypes.QUICKTASKER,
  is_active: true,
  has_password: false,
};

const baseWPUser: WPUser = {
  id: "2",
  name: "Jane WP",
  description: "A WP user",
  roles: ["editor", "admin"],
  created_at: "2023-01-02T00:00:00Z",
  caps: [],
  allcaps: [],
  user_type: UserTypes.WP_USER,
  profile_picture: "",
};

describe("UserAssignementSection", () => {
  it("renders section title", () => {
    render(
      <UserAssignementSection
        sectionTitle="Assignees"
        users={[]}
        noUsersText="No users"
      />,
    );
    expect(screen.getByText("Assignees")).toBeInTheDocument();
  });

  it("renders User and their info", () => {
    render(
      <UserAssignementSection
        sectionTitle="Assignees"
        users={[baseUser]}
        noUsersText="No users"
      />,
    );
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("A user")).toBeInTheDocument();
  });

  it("renders WPUser and their info", () => {
    render(
      <UserAssignementSection
        sectionTitle="Assignees"
        users={[baseWPUser]}
        noUsersText="No users"
      />,
    );
    expect(screen.getByText("Jane WP")).toBeInTheDocument();
    expect(screen.getByText("A WP user")).toBeInTheDocument();
    // WPUser roles
    expect(screen.getByText("editor,admin")).toBeInTheDocument();
  });

  it("calls onItemSelect when a user is clicked", () => {
    const onItemSelect = jest.fn();
    render(
      <UserAssignementSection
        sectionTitle="Assignees"
        users={[baseUser]}
        onItemSelect={onItemSelect}
        noUsersText="No users"
      />,
    );
    fireEvent.click(screen.getByText("John Doe"));
    expect(onItemSelect).toHaveBeenCalledWith(baseUser);
  });

  it("renders custom ActionIcon if provided", () => {
    render(
      <UserAssignementSection
        sectionTitle="Assignees"
        users={[baseUser]}
        ActionIcon={MockIcon}
        noUsersText="No users"
      />,
    );
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("renders noUsersText if users array is empty", () => {
    render(
      <UserAssignementSection
        sectionTitle="Assignees"
        users={[]}
        noUsersText="No users found"
      />,
    );
    expect(screen.getByText("No users found")).toBeInTheDocument();
  });
});
