import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { WPQTIconButton } from "../../../../../../components/common/Button/Button";
import { useNavigate } from "react-router-dom";

function ProfileActions() {
  const navigate = useNavigate();

  return (
    <div className="wpqt-flex wpqt-gap-3">
      <WPQTIconButton
        icon={<ChatBubbleLeftIcon className="wpqt-icon-blue wpqt-size-5" />}
        text="Manage user comments"
        onClick={() => {
          navigate(`/user/comments`);
        }}
      />
    </div>
  );
}

export { ProfileActions };
