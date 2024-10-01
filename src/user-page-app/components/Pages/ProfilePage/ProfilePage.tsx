import { PageContentWrap, PageWrap } from "../Page/Page";
import { ProfileActions } from "./components/ProfileActions/ProfileActions";

function PprofilePage() {
  return (
    <PageWrap>
      <PageContentWrap>
        <ProfileActions />
      </PageContentWrap>
    </PageWrap>
  );
}

export { PprofilePage };
