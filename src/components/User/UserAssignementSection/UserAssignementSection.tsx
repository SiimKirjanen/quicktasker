import { PlusIcon } from "@heroicons/react/24/outline";
import { isWPUser } from "../../../guards/user-guard";
import { User, WPUser } from "../../../types/user";

type UserAssignementSectionProps = {
  sectionTitle: string;
  selectionTitleIcon?: React.ReactNode;
  onItemSelect?: (user: User | WPUser) => void;
  users: User[] | WPUser[];
  ActionIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  actionIconClasses?: string;
  noUsersText: string;
  className?: string;
};
function UserAssignementSection({
  sectionTitle,
  selectionTitleIcon,
  onItemSelect = () => {},
  users = [],
  ActionIcon = PlusIcon,
  actionIconClasses,
  noUsersText,
  className = "",
}: UserAssignementSectionProps) {
  return (
    <div className={`wpqt-mb-2 ${className}`}>
      <div className="wpqt-mb-2 wpqt-text-lg wpqt-flex wpqt-items-center wpqt-gap-1">
        {selectionTitleIcon && (
          <span className="wpqt-mr-2">{selectionTitleIcon}</span>
        )}
        <span>{sectionTitle}</span>
      </div>
      {users.map((user: User | WPUser, index) => {
        return (
          <div
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              onItemSelect(user);
            }}
            className="wpqt-flex wpqt-cursor-pointer wpqt-items-center wpqt-px-2 wpqt-py-1 hover:wpqt-bg-gray-100"
          >
            <div className="wpqt-flex wpqt-flex-col">
              <div>{user.name}</div>
              <div className="wpqt-italic">{user.description}</div>
              {isWPUser(user) && <div>{user.roles?.join(",")}</div>}
            </div>
            <ActionIcon
              className={`wpqt-ml-auto wpqt-size-5 ${actionIconClasses}`}
            />
          </div>
        );
      })}
      {users.length === 0 && <div>{noUsersText}</div>}
    </div>
  );
}

export { UserAssignementSection };
