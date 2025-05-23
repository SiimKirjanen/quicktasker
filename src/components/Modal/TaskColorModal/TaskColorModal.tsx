import { Colorful } from "@uiw/react-color";
import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  CLOSE_TASK_COLOR_MODAL,
  DEFAULT_TASK_FOCUS_COLOR,
  PIPELINE_SET_TASK_FOCUS_COLOR,
} from "../../../constants";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { WPQTButton } from "../../common/Button/Button";
import { WPQTModal } from "../WPQTModal";

function TaskColorModal() {
  const {
    state: { taskColorModalOpen, taskToEdit },
    modalDispatch,
  } = useContext(ModalContext);
  const { dispatch } = useContext(ActivePipelineContext);
  const [focusColor, setFocusBgColor] = useState<string>(
    DEFAULT_TASK_FOCUS_COLOR,
  );

  const closeModal = () => {
    modalDispatch({
      type: CLOSE_TASK_COLOR_MODAL,
    });
  };

  const applyTaskFocusColor = () => {
    if (!taskToEdit) {
      return;
    }

    dispatch({
      type: PIPELINE_SET_TASK_FOCUS_COLOR,
      payload: {
        taskId: taskToEdit.id,
        color: focusColor,
      },
    });
  };
  const resetColor = () => {
    setFocusBgColor(DEFAULT_TASK_FOCUS_COLOR);
  };

  useEffect(() => {
    if (taskToEdit && taskToEdit.task_focus_color) {
      setFocusBgColor(taskToEdit.task_focus_color);
    }
  }, [taskToEdit]);

  return (
    <WPQTModal modalOpen={taskColorModalOpen} closeModal={closeModal} size="sm">
      <div className="wpqt-flex wpqt-flex-col wpqt-gap-4 wpqt-items-center">
        <div className="wpqt-text-lg">
          {__("Task border color", "quicktasker")}
        </div>
        <Colorful
          color={focusColor || undefined}
          disableAlpha={true}
          onChange={(color) => {
            setFocusBgColor(color.hex);
          }}
        />
        <WPQTButton
          btnText={__("Apply changes", "quicktasker")}
          onClick={applyTaskFocusColor}
          /*   loading={loading} */
        />
        <WPQTButton
          btnText={__("Reset color", "quicktasker")}
          onClick={resetColor}
        />
      </div>
    </WPQTModal>
  );
}

export { TaskColorModal };
