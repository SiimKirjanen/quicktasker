import { Colorful } from "@uiw/react-color";
import { useContext, useEffect, useState } from "@wordpress/element";
import { __ } from "@wordpress/i18n";
import {
  CLOSE_TASK_COLOR_MODAL,
  DEFAULT_TASK_FOCUS_COLOR,
  PIPELINE_SET_TASK_FOCUS_COLOR,
} from "../../../constants";
import { useTaskActions } from "../../../hooks/actions/useTaskActions";
import { ActivePipelineContext } from "../../../providers/ActivePipelineContextProvider";
import { ModalContext } from "../../../providers/ModalContextProvider";
import { ButtonStyleType, WPQTButton } from "../../common/Button/Button";
import { WPQTModal } from "../WPQTModal";

function TaskColorModal() {
  const {
    state: { taskColorModalOpen, taskToEdit },
    modalDispatch,
  } = useContext(ModalContext);
  const { dispatch } = useContext(ActivePipelineContext);
  const { updateTaskFocusColor } = useTaskActions();
  const [focusColor, setFocusBgColor] = useState<string>(
    DEFAULT_TASK_FOCUS_COLOR,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const closeModal = () => {
    modalDispatch({
      type: CLOSE_TASK_COLOR_MODAL,
    });
  };

  const applyTaskFocusColor = async () => {
    if (!taskToEdit) {
      return;
    }
    setLoading(true);
    const { success } = await updateTaskFocusColor(taskToEdit.id, focusColor);
    setLoading(false);
    if (!success) {
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
          {__("Task focus color", "quicktasker")}
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
          loading={loading}
        />
        <WPQTButton
          buttonStyleType={ButtonStyleType.DANGER}
          btnText={__("Reset color", "quicktasker")}
          onClick={resetColor}
        />
      </div>
    </WPQTModal>
  );
}

export { TaskColorModal };
