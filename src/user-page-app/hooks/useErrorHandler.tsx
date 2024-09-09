import { toast } from "react-toastify";

function useErrorHandler() {
  const handleError = (error: any) => {
    if (error.messages && Array.isArray(error.messages)) {
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
