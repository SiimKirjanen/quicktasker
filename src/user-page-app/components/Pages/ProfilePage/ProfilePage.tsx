import { useContext } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { CustomFieldEntityType } from "../../../../types/custom-field";
import { UserTypes } from "../../../../types/user";
import {
  UserPageUserContext,
  UserPageUserContextProvider,
} from "../../../providers/UserPageUserContextProvider";
import { CustomFieldsWrap } from "../../CustomField/CustomFieldsWrap/CustomFieldsWrap";
import { PageContentWrap, PageTitle, PageWrap } from "../Page/Page";
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
    state: { loading, user, customFields },
    loadUserData,
  } = useContext(UserPageUserContext);

  if (!user) {
    return null;
  }

  const mapUserTypeToEntityType = (
    userType: UserTypes,
  ): CustomFieldEntityType.QUICKTASKER | CustomFieldEntityType.WP_USER => {
    switch (userType) {
      case UserTypes.QUICKTASKER:
        return CustomFieldEntityType.QUICKTASKER;
      case UserTypes.WP_USER:
        return CustomFieldEntityType.WP_USER;
      default:
        throw new Error(`Unsupported user type: ${userType}`);
    }
  };

  return (
    <PageWrap loading={loading} onRefresh={loadUserData}>
      <PageContentWrap>
        <PageTitle>{__("User details", "quicktasker")}</PageTitle>
        <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3">
          <UserDetails user={user} />
          <CustomFieldsWrap
            entityId={user.id}
            entityType={mapUserTypeToEntityType(user.user_type)}
            entity={user}
            customFields={customFields}
          />
          <ProfileActions />
        </div>
      </PageContentWrap>
    </PageWrap>
  );
}

export { PprofilePage };
