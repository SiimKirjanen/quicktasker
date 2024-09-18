import { toast } from "react-toastify";

function useErrorHandler() {
  const handleError = (error: any) => {
    if (
      error.messages &&
      Array.isArray(error.messages) &&
      error.messages.length > 0
    ) {
      const errorMessage = error.messages.join(", ");
      toast.error(errorMessage);
    }
    console.error(error);
  };

  return {
    handleError,
  };
}

export { useErrorHandler };
