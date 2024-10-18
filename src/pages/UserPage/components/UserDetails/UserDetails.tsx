import { __ } from "@wordpress/i18n";
import { usePageLinks } from "../../../../hooks/usePageLinks";
import { ExtendedUser } from "../../../../types/user";

type Props = {
  data: ExtendedUser;
};
function UserDetails({ data }: Props) {
  const { userPage } = usePageLinks();
  const isActive = data.is_active;

  return (
    <div className="wpqt-flex wpqt-flex-col wpqt-gap-2">
      <div>
        <span className="wpqt-font-semibold">
          {__("Name", "quicktasker")}:{" "}
        </span>
        <span>{data.name}</span>
      </div>

      <div>
        <span className="wpqt-font-semibold">
          {__("Created at", "quicktasker")}:{" "}
        </span>
        <span>{data.created_at}</span>
      </div>

      <div>
        <span className="wpqt-font-semibold">
          {__("Setup completed", "quicktasker")}:{" "}
        </span>
        <span>
          {data.setup_completed
            ? __("Yes", "quicktasker")
            : __("No", "quicktasker")}
        </span>
      </div>

      <div>
        <span className="wpqt-font-semibold">
          {__("Assigned tasks count", "quicktasker")}:{" "}
        </span>
        <span>{data.assigned_tasks_count}</span>
      </div>

      <div>
        <span className="wpqt-font-semibold">
          {__("Is active", "quicktasker")}:{" "}
        </span>
        <span>
          {isActive ? __("Yes", "quicktasker") : __("No", "quicktasker")}
        </span>
      </div>

      <div>
        <span className="wpqt-font-semibold">
          {__("User Page", "quicktasker")}:{" "}
        </span>
        <span>
          <a
            href={userPage + "&code=" + data.page_hash}
            target="_blank"
            rel="noreferrer"
          >
            {userPage + "&code=" + data.page_hash}
          </a>
        </span>
      </div>
    </div>
  );
}

export { UserDetails };
