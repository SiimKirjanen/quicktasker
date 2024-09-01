import { useContext } from "@wordpress/element";
import { AppContext } from "../providers/AppContextProvider";
import { WPQT_PAGE } from "../constants";

function usePageLinks() {
  const {
    state: { siteURL },
  } = useContext(AppContext);
  const userPage = siteURL + `?page=${WPQT_PAGE}`;

  return {
    userPage,
  };
}

export { usePageLinks };
