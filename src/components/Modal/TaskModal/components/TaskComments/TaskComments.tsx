import { LockClosedIcon, UsersIcon } from "@heroicons/react/24/outline";
import { useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import { WPQTTypes } from "../../../../../types/enums";
import { CommentsTabContent } from "../../../../Tab/CommentsAndLogs/CommentsTabContent";

type Visibility = "private" | "public";

type Props = {
  taskId: string;
};

function TaskComments({ taskId }: Props) {
  const [visibility, setVisibility] = useState<Visibility>("private");

  return (
    <div>
      <div className="wpqt-mb-4 wpqt-inline-flex wpqt-rounded-md wpqt-bg-gray-100 wpqt-p-1">
        <SegmentedButton
          active={visibility === "private"}
          onClick={() => setVisibility("private")}
          icon={<LockClosedIcon className="wpqt-size-4" />}
          label={__("Private", "quicktasker")}
        />
        <SegmentedButton
          active={visibility === "public"}
          onClick={() => setVisibility("public")}
          icon={<UsersIcon className="wpqt-size-4" />}
          label={__("Public", "quicktasker")}
        />
      </div>
      <CommentsTabContent
        key={visibility}
        subjectId={taskId}
        subjectType={WPQTTypes.Task}
        isPrivate={visibility === "private"}
      />
    </div>
  );
}

type SegmentedButtonProps = {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
};

function SegmentedButton({
  active,
  onClick,
  icon,
  label,
}: SegmentedButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`wpqt-flex wpqt-items-center wpqt-gap-2 wpqt-rounded wpqt-border-0 wpqt-px-4 wpqt-py-1.5 wpqt-text-sm wpqt-font-medium wpqt-cursor-pointer wpqt-transition-colors ${
        active
          ? "wpqt-bg-white wpqt-text-blue-600 wpqt-shadow-sm"
          : "wpqt-bg-transparent wpqt-text-gray-500 hover:wpqt-text-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export { TaskComments };
