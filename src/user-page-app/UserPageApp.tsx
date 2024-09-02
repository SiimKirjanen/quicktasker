import { UserPageAppContextProvider } from "./providers/UserPageAppContextProvider";

function UserPageApp() {
  return (
    <UserPageAppContextProvider>
      <div>
        <h1>User Page</h1>
      </div>
    </UserPageAppContextProvider>
  );
}

export default UserPageApp;
