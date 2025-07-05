import { toast } from "react-toastify";

function useErrorHandler() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const displayErrorMessages = async (error: any) => {
    if (
      error.messages &&
      Array.isArray(error.messages) &&
      error.messages.length > 0
    ) {
      const errorMessages = error.messages.join(", ");
      toast.error(errorMessages);
    }
  };

  const getMessagesFromResponse = (error: unknown): string[] => {
    if (
      error !== null &&
      typeof error === "object" &&
      "messages" in error &&
      Array.isArray(error.messages)
    ) {
      return error.messages;
    }
    return [];
  };

  return {
    displayErrorMessages,
    getMessagesFromResponse,
  };
}

export { useErrorHandler };
