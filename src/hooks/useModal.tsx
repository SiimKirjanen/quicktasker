// @ts-nocheck
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useRef, useState } from "@wordpress/element";
import { ActivePipelineContext } from "../providers/ActivePipelineContextProvider";
import { PipelinesContext } from "../providers/PipelinesContextProvider";
import { UserContext } from "../providers/UserContextProvider";

enum DispatchType {
  ACTIVE_PIPELINE = "ACTIVE_PIPELINE",
  PIPELINES = "PIPELINES",
  USER = "USER",
}
interface ModalContentRef {
  clearContent: () => void;
}

export const useModal = () => {
  const [modalSaving, setModalSaving] = useState(false);
  const modalContentRef = useRef<ModalContentRef | null>(null);
  const { dispatch: activePipelineDispatch } = useContext(
    ActivePipelineContext,
  );
  const { pipelinesDispatch } = useContext(PipelinesContext);
  const { userDispatch } = useContext(UserContext);

  const handleSuccess = (
    type: string,
    payload: any,
    dispatchType: DispatchType,
  ) => {
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
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleError = (error: any) => {
    setModalSaving(false);
    console.error(error);
  };

  return {
    modalSaving,
    setModalSaving,
    modalContentRef,
    handleSuccess,
    handleError,
  };
};

export { DispatchType };
