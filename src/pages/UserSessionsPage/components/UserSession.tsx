import { __ } from "@wordpress/i18n";
import { useTimezone } from "../../../hooks/useTimezone";
import { UserSession } from "../../../types/user-session";
import { isUTCDateInPast } from "../../../utils/timezone";

type Props = {
  session: UserSession;
};

function UserSession({ session }: Props) {
  const { convertToWPTimezone } = useTimezone();
  const isExpired = isUTCDateInPast(session.expires_at_utc);
  const isActive = session.is_active && !isExpired;

  let statusLabel: string;
  if (isExpired) {
    statusLabel = __("Expired", "quicktasker");
  } else if (session.is_active) {
    statusLabel = __("Active", "quicktasker");
  } else {
    statusLabel = __("Logged out", "quicktasker");
  }

  return (
    <>
      <div>
        <div>{session.user_name}</div>
        <div className="wpqt-italic">{session.user_description}</div>
      </div>
      <div>{convertToWPTimezone(session.created_at_utc)}</div>
      <div>{convertToWPTimezone(session.expires_at_utc)}</div>
      <div
        className={isActive ? "wpqt-text-qtTextGreen" : "wpqt-text-qtTextRed"}
      >
        {statusLabel}
      </div>
    </>
  );
}

export { UserSession };
