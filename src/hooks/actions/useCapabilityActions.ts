import { updateWPUserPermissionsRequest } from "../../api/api";
import { WPUserCapabilities } from "../../types/capabilities";

function useCapabilityActions() {
  const updateWPUserCapabilities = async (
    userId: string,
    capabilities: WPUserCapabilities,
    callback?: () => void,
    onFailueCallback?: (error: unknown) => void,
  ) => {
    try {
      await updateWPUserPermissionsRequest(userId, capabilities);
      if (callback) callback();
    } catch (e) {
      if (onFailueCallback) onFailueCallback(e);
    }
  };

  return { updateWPUserCapabilities };
}

export { useCapabilityActions };
