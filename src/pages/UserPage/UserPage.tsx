import { Page } from "../Page/Page";
import { WPQTPageHeader } from "../../components/common/Header/Header";
import { useContext, useEffect, useState } from "@wordpress/element";
import { LoadingContext } from "../../providers/LoadingContextProvider";
import { SET_FULL_PAGE_LOADING } from "../../constants";
import { getExtendedUserRequest } from "../../api/api";
import { ExtendedUser } from "../../types/user";
import { toast } from "react-toastify";
import { convertExtendedUserFromServer } from "../../utils/user";
import { UserDetails } from "./components/UserDetails/UserDetails";
import { UserControls } from "./components/UserControls/UserControls";

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

  const onChangeStatus = async (status: boolean) => {
    setUserData((prevData) => {
      if (prevData) {
        return { ...prevData, is_active: status };
      }
      return prevData;
    });
  };
  const onChangeSetUpStatus = async (status: boolean) => {
    setUserData((prevData) => {
      if (prevData) {
        return { ...prevData, setup_completed: status };
      }
      return prevData;
    });
  };

  return (
    <Page>
      {userData && (
        <>
          <WPQTPageHeader description="This is a user page">
            {userData.name}
          </WPQTPageHeader>
          <UserDetails data={userData} />
          <UserControls
            data={userData}
            changeStatus={onChangeStatus}
            changeSetUpStatus={onChangeSetUpStatus}
          />
        </>
      )}
    </Page>
  );
}

export { UserPage };
