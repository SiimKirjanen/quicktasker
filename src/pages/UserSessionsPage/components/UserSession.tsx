import { useTimezone } from "../../../hooks/useTimezone";
import { UserSession } from "../../../types/user-session";

type Props = {
  session: UserSession;
};

function UserSession({ session }: Props) {
  const { convertToWPTimezone } = useTimezone();

  return (
    <>
      <div>
        <div>{session.user_name}</div>
        <div className="wpqt-italic">{session.user_description}</div>
      </div>
      <div>{convertToWPTimezone(session.created_at_utc)}</div>
      <div>{convertToWPTimezone(session.expires_at_utc)}</div>
    </>
  );
}

export { UserSession };
