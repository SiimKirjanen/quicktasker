import { TrashIcon } from "@heroicons/react/24/outline";
import { __ } from "@wordpress/i18n";
import { TbLogs } from "react-icons/tb";
import { WPQTConfirmTooltip } from "../../Dialog/ConfirmTooltip/ConfirmTooltip";
import { Loading } from "../../Loading/Loading";
import { WPQTIconButton } from "../../common/Button/WPQTIconButton/WPQTIconButton";
import { Toggle } from "../../common/Toggle/Toggle";
import { WPQTCard } from "../Card";

type Props = {
  title: string;
  className?: string;
  activateLoading?: boolean;
  active: boolean;
  deleteLoading?: boolean;
  deleteConfirmMessage: string;
  onDelete: () => void;
  onActiveChange: (active: boolean) => void;
  openLogs?: () => void;
};

function WPQTControls({
  title,
  className,
  activateLoading,
  active,
  deleteLoading,
  deleteConfirmMessage,
  onDelete,
  onActiveChange,
  openLogs = () => {},
}: Props) {
  return (
    <WPQTCard
      title={title}
      className={`${className} wpqt-ml-6`}
      titleClassName="wpqt-absolute wpqt-top-0 wpqt-left-[50%] wpqt-transform-center wpqt-bg-[#fff] wpqt-text-[1rem] wpqt-leading-none wpqt-font-semibold wpqt-p-1"
    >
      <div className="wpqt-flex wpqt-flex-col wpqt-items-center wpqt-gap-3 wpqt-justify-center">
        <div className="wpqt-flex wpqt-flex-col wpqt-gap-1 wpqt-justify-center wpqt-items-center wpqt-h-[40px]">
          {activateLoading ? (
            <Loading ovalSize="32" />
          ) : (
            <>
              <span className="wpqt-font-semibold">
                {__("Active", "quicktasker")}
              </span>
              <Toggle checked={active} handleChange={onActiveChange} />
            </>
          )}
        </div>
        <div className="wpqt-flex wpqt-gap-2">
          <WPQTIconButton
            icon={<TbLogs className="wpqt-icon-blue wpqt-size-5" />}
            onClick={openLogs}
            text={__("Logs", "quicktasker")}
          />
          <WPQTConfirmTooltip
            confirmMessage={__(deleteConfirmMessage, "quicktasker")}
            onConfirm={async () => {
              onDelete();
            }}
          >
            {({ onClick }) => (
              <WPQTIconButton
                loading={deleteLoading}
                icon={<TrashIcon className="wpqt-icon-red wpqt-size-5" />}
                onClick={onClick}
                text={__("Delete", "quicktasker")}
              />
            )}
          </WPQTConfirmTooltip>
        </div>
      </div>
    </WPQTCard>
  );
}

export { WPQTControls };
