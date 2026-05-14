import { __ } from "@wordpress/i18n";
import type { BoardStatus } from "../types";

type Props = { boardStatus: BoardStatus };

export default function BoardClosedMessage({ boardStatus }: Props) {
  if (!boardStatus.enabled) {
    return (
      <div className="wpqt-public-task-closed">
        <p>
          {__(
            "This board is not currently accepting task submissions.",
            "quicktasker",
          )}
        </p>
      </div>
    );
  }
  if (boardStatus.login_required) {
    return (
      <div className="wpqt-public-task-closed">
        <p>
          {__(
            "You must be logged in as a WordPress user to submit a task to this board.",
            "quicktasker",
          )}
        </p>
      </div>
    );
  }
  if (boardStatus.limit_reached) {
    return (
      <div className="wpqt-public-task-closed">
        <p>
          {__("This board has reached its submission limit.", "quicktasker")}
        </p>
      </div>
    );
  }
  return null;
}
