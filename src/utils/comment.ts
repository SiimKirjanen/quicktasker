import { WPQTComment } from "../types/comment";
import { getCurrentUTCDateTime, getDateDifference } from "./date";

const filterNewComments = (
  comments: WPQTComment[],
  storedComments: WPQTComment[],
) => {
  return comments.filter(
    (comment) => !storedComments.find((c) => c.id === comment.id),
  );
};

const filterOutOldComments = (comments: WPQTComment[]): WPQTComment[] => {
  const currentDate = getCurrentUTCDateTime();

  return comments.filter((comment) => {
    try {
      if (!comment.created_at) {
        return false;
      }

      const dateDiff = getDateDifference(comment.created_at, currentDate);

      return dateDiff.days <= 5;
    } catch (error) {
      console.error(`Error filtering old comment: `, error);
      return false;
    }
  });
};

export { filterNewComments, filterOutOldComments };
