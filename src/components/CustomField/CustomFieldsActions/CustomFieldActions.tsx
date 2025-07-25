import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { useContext } from "@wordpress/element";
import { TbRestore } from "react-icons/tb";
import {
  SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
  SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN,
} from "../../../constants";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTIconButton } from "../../common/Button/Button";

type Props = {
  className?: string;
};
function CustomFieldActins({ className = "" }: Props) {
  const { modalDispatch } = useContext(ModalContext);

  return (
    <div className={`wpqt-flex wpqt-gap-2 ${className}`}>
      <WPQTIconButton
        onClick={() => {
          modalDispatch({
            type: SET_CUSTOM_FIELD_RECOVERY_MODAL_OPEN,
            payload: true,
          });
        }}
        icon={<TbRestore className="wpqt-icon-blue wpqt-size-4" />}
      />
      <WPQTIconButton
        onClick={() => {
          modalDispatch({
            type: SET_CUSTOM_FIELD_CREATOR_MODAL_OPEN,
            payload: true,
          });
        }}
        icon={<PlusCircleIcon className="wpqt-icon-green wpqt-size-4" />}
      />
    </div>
  );
}

export { CustomFieldActins };
