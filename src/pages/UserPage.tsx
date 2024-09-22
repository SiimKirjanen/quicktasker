import { Page } from "./Page/Page";
import { WPQTPageHeader } from "../components/common/Header/Header";
import { useContext, useEffect, useState } from "@wordpress/element";
import { LoadingContext } from "../providers/LoadingContextProvider";
import { SET_FULL_PAGE_LOADING } from "../constants";
import { getExtendedUserRequest } from "../api/api";
import { ExtendedUser } from "../types/user";
import { toast } from "react-toastify";
import { convertExtendedUserFromServer } from "../utils/user";
import { UserDataSection } from "../components/User/UserDataSection/UserDataSection";

type Props = {
  userId: string;
};
function UserPage({ userId }: Props) {
  const { loadingDispatch } = useContext(LoadingContext);
  const [userData, setUserData] = useState<ExtendedUser | null>(null);

  useEffect(() => {
    const getUserData = async () => {
      try {
        loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: true });
        const response = await getExtendedUserRequest(userId);
        setUserData(convertExtendedUserFromServer(response.data));
      } catch (error) {
        console.error(error);
        toast.error("Failed to get user data. Please try again");
      } finally {
        loadingDispatch({ type: SET_FULL_PAGE_LOADING, payload: false });
      }
    };
    getUserData();
  }, []);

  return (
    <Page>
      {userData && (
        <>
          <WPQTPageHeader description="This is a user page">
            {userData.name}
          </WPQTPageHeader>
          <UserDataSection userData={userData} />
        </>
      )}
    </Page>
  );
}

export { UserPage };
