import { useContext } from "@wordpress/element";
import { UserPageAppContext } from "../providers/UserPageAppContextProvider";
import { WPQTComment } from "../../types/comment";

const WPQT_STORED_COMMENTS_KEY = "wpqt-stored-comments";

function useLocalStorage() {
  const {
    state: { pageHash },
  } = useContext(UserPageAppContext);

  const getStoredComments = async (): Promise<WPQTComment[]> => {
    const storedComments = localStorage.getItem(
      `${WPQT_STORED_COMMENTS_KEY}-${pageHash}`,
    );

    return storedComments ? JSON.parse(storedComments) : [];
  };

  const storeComments = (comments: WPQTComment[]) => {
    localStorage.setItem(
      `${WPQT_STORED_COMMENTS_KEY}-${pageHash}`,
      JSON.stringify(comments),
    );
  };

  return { getStoredComments, storeComments };
}

export { useLocalStorage };
