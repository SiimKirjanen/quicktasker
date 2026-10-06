import { updateWPUserPermissionsRequest } from "../../api/api";
import { WPUserCapabilities } from "../../types/capabilities";
import { WPUserCapabilitiesUpdate } from "../../types/user";

function useCapabilityActions() {
  const updateWPUserCapabilities = async (
    userId: string,
    capabilities: WPUserCapabilities,
    callback?: (update: WPUserCapabilitiesUpdate) => void,
    onFailueCallback?: (error: unknown) => void,
  ) => {
    try {
      const response = await updateWPUserPermissionsRequest(
        userId,
        capabilities,
      );
      if (callback) callback(response.data);
    } catch (e) {
      if (onFailueCallback) onFailueCallback(e);
    }
  };

  return { updateWPUserCapabilities };
}

export { useCapabilityActions };
