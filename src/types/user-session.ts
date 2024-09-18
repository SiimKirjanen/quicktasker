type BaseUserSession = {
  id: string;
  user_id: string;
  user_name: string;
  user_description: string;
  created_at_utc: string;
  expires_at_utc: string;
};

type UserSession = BaseUserSession;
type ServerUserSession = BaseUserSession;

export type { UserSession, ServerUserSession };
