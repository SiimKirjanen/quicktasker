import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { isWPUser } from "../../../../../guards/user-guard";
import { User, UserTypes, WPUser } from "../../../../../types/user";
import { canWPUserAccessPipeline } from "../../../../../utils/user";
import { WPQTInput } from "../../../../common/Input/Input";
import { QuickTaskerIcon } from "../../../../Icon/QuickTaskerIcon/QuickTaskerIcon";
import { WordPressIcon } from "../../../../Icon/WordPressIcon/WordPressIcon";

type Props = {
  quickTaskerUsers: User[];
  wpUsers: WPUser[];
  // WordPress users who have not been added to this board cannot be picked.
  pipelineId?: string;
  assignUser: (target: User | WPUser) => void;
};

type TypeFilter = "all" | UserTypes.QUICKTASKER | UserTypes.WP_USER;

function AutomationActionTargetUserSelection({
  quickTaskerUsers,
  wpUsers,
  pipelineId,
  assignUser,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchesSearch = (user: User | WPUser) =>
    !normalizedSearch ||
    (user.name ?? "").toLowerCase().includes(normalizedSearch);
  const matchesTypeFilter = (user: User | WPUser) =>
    typeFilter === "all" || user.user_type === typeFilter;

  const hasBoardAccess = (user: User | WPUser) =>
    !pipelineId || !isWPUser(user) || canWPUserAccessPipeline(user, pipelineId);

  const combinedUsers: (User | WPUser)[] = [...wpUsers, ...quickTaskerUsers];
  const matchingUsers = combinedUsers
    .filter(matchesTypeFilter)
    .filter(matchesSearch);
  // Users who cannot be picked are listed last.
  const filteredUsers = [
    ...matchingUsers.filter(hasBoardAccess),
    ...matchingUsers.filter((user) => !hasBoardAccess(user)),
  ];

  const filterPills: {
    value: TypeFilter;
    label: string;
    testId: string;
  }[] = [
    { value: "all", label: __("All", "quicktasker"), testId: "filter-all" },
    {
      value: UserTypes.WP_USER,
      label: __("WordPress", "quicktasker"),
      testId: "filter-wp-user",
    },
    {
      value: UserTypes.QUICKTASKER,
      label: __("Quicktaskers", "quicktasker"),
      testId: "filter-quicktasker",
    },
  ];

  return (
    <div className="wpqt-flex wpqt-w-[320px] wpqt-flex-col">
      <div onClick={(e) => e.stopPropagation()} className="wpqt-mb-2">
        <WPQTInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder={__("Search", "quicktasker")}
          leftIcon={<MagnifyingGlassIcon className="wpqt-size-4" />}
          wrapperClassName="wpqt-block wpqt-w-full"
          className="wpqt-w-full"
        />
      </div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="wpqt-mb-2 wpqt-flex wpqt-gap-1"
        data-testid="automation-target-filter"
      >
        {filterPills.map((pill) => {
          const active = typeFilter === pill.value;
          return (
            <button
              key={pill.value}
              type="button"
              data-testid={pill.testId}
              data-active={active}
              onClick={() => setTypeFilter(pill.value)}
              className={`wpqt-cursor-pointer wpqt-rounded-full wpqt-border wpqt-border-solid wpqt-px-3 wpqt-py-1 wpqt-text-xs ${
                active
                  ? "wpqt-border-blue-600 wpqt-bg-blue-50 wpqt-text-blue-700"
                  : "wpqt-border-qtBorder wpqt-bg-white wpqt-text-gray-700 hover:wpqt-bg-gray-100"
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>
      <div data-testid="automation-target-list">
        {filteredUsers.map((user) => {
          const boardAccess = hasBoardAccess(user);

          return (
            <div
              key={`${user.user_type}-${user.id}`}
              data-testid={
                boardAccess
                  ? "automation-target-row"
                  : "automation-target-row-no-board-access"
              }
              aria-disabled={!boardAccess}
              onClick={(e) => {
                e.stopPropagation();
                if (boardAccess) {
                  assignUser(user);
                }
              }}
              className={`wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-px-2 wpqt-py-1 ${
                boardAccess
                  ? "wpqt-cursor-pointer hover:wpqt-bg-gray-100"
                  : "wpqt-cursor-not-allowed wpqt-opacity-60"
              }`}
            >
              <span className="wpqt-shrink-0">
                {user.user_type === UserTypes.WP_USER ? (
                  <WordPressIcon size={20} />
                ) : (
                  <QuickTaskerIcon />
                )}
              </span>
              <div className="wpqt-flex wpqt-flex-col">
                <div>{user.name}</div>
                {user.description && (
                  <div className="wpqt-italic">{user.description}</div>
                )}
                {isWPUser(user) && user.roles?.length > 0 && (
                  <div>{user.roles.join(",")}</div>
                )}
                {!boardAccess && (
                  <div className="wpqt-text-yellow-700">
                    {__("Not added to this board", "quicktasker")}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {filteredUsers.length === 0 && (
          <div className="wpqt-px-2 wpqt-py-1">
            {__("No users found", "quicktasker")}
          </div>
        )}
      </div>
    </div>
  );
}

export { AutomationActionTargetUserSelection };
