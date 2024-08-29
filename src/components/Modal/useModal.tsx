import { useContext, useRef, useState } from "@wordpress/element";
import { ModalContext } from "../../providers/ModalContextProvider";
import { ActivePipelineContext } from "../../providers/ActivePipelineContextProvider";
import { PipelinesContext } from "../../providers/PipelinesContextProvider";
import { UserContext } from "../../providers/UserContextProvider";

const DispatchType = {
  ACTIVE_PIPELINE: "ACTIVE_PIPELINE",
  PIPELINES: "PIPELINES",
  USER: "USER",
};

export const useModal = (closeActionType: string) => {
  const [modalSaving, setModalSaving] = useState(false);
  const modalContentRef = useRef<any>(null);
  const { modalDispatch } = useContext(ModalContext);
  const { dispatch: activePipelineDispatch } = useContext(
    ActivePipelineContext,
  );
  const { pipelinesDispatch } = useContext(PipelinesContext);
  const { userDispatch } = useContext(UserContext);

  const closeModal = () => {
    modalDispatch({
      type: closeActionType,
    });
    clearModalContent();
  };

  const clearModalContent = () => {
    if (modalContentRef.current) {
      modalContentRef.current.clearContent();
    }
  };

  const handleSuccess = (type: string, payload: any, dispatchType: string) => {
    let dispatchFunction;

    switch (dispatchType) {
      case DispatchType.PIPELINES: {
        dispatchFunction = pipelinesDispatch;
        break;
      }
      case DispatchType.ACTIVE_PIPELINE: {
        dispatchFunction = activePipelineDispatch;
        break;
      }
      case DispatchType.USER: {
        dispatchFunction = userDispatch;
        break;
      }
      default:
        dispatchFunction = activePipelineDispatch;
        break;
    }

    setModalSaving(false);
    dispatchFunction({
      type,
      payload,
    });
    closeModal();
  };

  const handleError = (error: any) => {
    setModalSaving(false);
    console.error(error);
  };

  return {
    modalSaving,
    setModalSaving,
    modalContentRef,
    closeModal,
    handleSuccess,
    handleError,
  };
};

export { DispatchType };
