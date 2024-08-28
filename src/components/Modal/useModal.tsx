import { useContext, useRef, useState } from "@wordpress/element";
import { ModalContext } from "../../providers/ModalContextProvider";
import { PipelineContext } from "../../providers/PipelineContextProvider";
import { PipelinesContext } from "../../providers/PipelinesContextProvider";

export const useModal = (closeActionType: string) => {
  const [modalSaving, setModalSaving] = useState(false);
  const modalContentRef = useRef<any>(null);
  const { modalDispatch } = useContext(ModalContext);
  const { dispatch } = useContext(PipelineContext);
  const { pipelinesDispatch } = useContext(PipelinesContext);

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

  const handleSuccess = (
    type: string,
    payload: any,
    usePipelinesDispatch: boolean = false,
  ) => {
    const dispatchFunction = usePipelinesDispatch
      ? pipelinesDispatch
      : dispatch;

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
