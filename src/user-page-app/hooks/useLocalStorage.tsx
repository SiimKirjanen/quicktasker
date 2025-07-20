import { useContext } from "@wordpress/element";
import { WPQTComment } from "../../types/comment";
import { UserTypes } from "../../types/user";
import { filterNewComments, filterOutOldComments } from "../../utils/comment";
import { UserPageAppContext } from "../providers/UserPageAppContextProvider";

const WPQT_STORED_COMMENTS_KEY = "wpqt-stored-comments";

function useLocalStorage() {
  const {
    state: { pageHash, userId, userType },
  } = useContext(UserPageAppContext);
  const key = userType === UserTypes.QUICKTASKER ? pageHash : userId;

  const getStoredComments = async (): Promise<WPQTComment[]> => {
    try {
      const storedComments = localStorage.getItem(
        `${WPQT_STORED_COMMENTS_KEY}-${key}`,
      );

      return storedComments ? JSON.parse(storedComments) : [];
    } catch (error) {
      console.error("Error retrieving stored comments:", error);

      return [];
    }
  };

  const storeComments = async (comments: WPQTComment[]) => {
    try {
      const storedComments = await getStoredComments();
      const recentComments = filterOutOldComments(storedComments);
      const newComments = filterNewComments(comments, recentComments);
      const allComments = [...recentComments, ...newComments];

      localStorage.setItem(
        `${WPQT_STORED_COMMENTS_KEY}-${key}`,
        JSON.stringify(allComments),
      );
    } catch (error) {
      console.error("Error storing comments:", error);
    }
  };

  return { getStoredComments, storeComments };
}

export { useLocalStorage };
