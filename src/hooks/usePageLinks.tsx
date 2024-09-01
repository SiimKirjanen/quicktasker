import { useContext } from "@wordpress/element";
import { AppContext } from "../providers/AppContextProvider";

function usePageLinks() {
  const {
    state: { siteURL, publicUserPageId },
  } = useContext(AppContext);
  const userPage = siteURL + `?page=${publicUserPageId}`;

  return {
    userPage,
  };
}

export { usePageLinks };
