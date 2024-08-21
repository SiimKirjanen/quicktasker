import { useContext, useRef, useState } from "@wordpress/element";
import { ModalContext } from "../../providers/ModalContextProvider";
import { PipelineContext } from "../../providers/PipelineContextProvider";

export const useModal = (closeActionType: string) => {
  const [modalSaving, setModalSaving] = useState(false);
  const modalContentRef = useRef<any>(null);
  const { modalDispatch } = useContext(ModalContext);
  const { dispatch } = useContext(PipelineContext);

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

  const handleSuccess = (type: string, payload: any) => {
    setModalSaving(false);
    dispatch({
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
