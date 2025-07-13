import { WPQTComment } from "../types/comment";

const filterNewComments = (
  comments: WPQTComment[],
  storedComments: WPQTComment[],
) => {
  return comments.filter(
    (comment) => !storedComments.find((c) => c.id === comment.id),
  );
};

export { filterNewComments };
