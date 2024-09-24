import { toast } from "react-toastify";
import { addLogRequest } from "../../api/api";
import { WPQTTypes } from "../../types/enums";

function useLogActions() {
  const addLog = async (userId: string, type: WPQTTypes, text: string) => {
    try {
      const response = await addLogRequest(userId, type, text);

      return response.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to add log");
    }
  };
  return { addLog };
}

export { useLogActions };
