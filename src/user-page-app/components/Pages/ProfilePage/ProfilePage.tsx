import { useContext } from "@wordpress/element";
import {
  UserPageUserContext,
  UserPageUserContextProvider,
} from "../../../providers/UserPageUserContextProvider";
import { PageContentWrap, PageWrap } from "../Page/Page";
import { ProfileActions } from "./components/ProfileActions/ProfileActions";
import { UserDetails } from "./components/UserDetails/UserDetails";

function PprofilePage() {
  return (
    <UserPageUserContextProvider>
      <ProfilePageContent />
    </UserPageUserContextProvider>
  );
}

function ProfilePageContent() {
  const {
    state: { loading, user },
    loadUserData,
  } = useContext(UserPageUserContext);

  return (
    <PageWrap loading={loading} onRefresh={loadUserData}>
      <PageContentWrap>
        <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3">
          <UserDetails user={user} />
          <ProfileActions />
        </div>
      </PageContentWrap>
    </PageWrap>
  );
}

export { PprofilePage };
