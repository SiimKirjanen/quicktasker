import { UserSession } from "../../../types/user-session";

type Props = {
  session: UserSession;
};

function UserSession({ session }: Props) {
  return (
    <>
      <div>
        <div>{session.user_name}</div>
        <div className="wpqt-italic">{session.user_description}</div>
      </div>
      <div>{session.created_at_utc}</div>
      <div>{session.expires_at_utc}</div>
      <div>Actions</div>
    </>
  );
}

export { UserSession };
