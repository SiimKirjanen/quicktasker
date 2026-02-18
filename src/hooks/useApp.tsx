import { useContext } from "@wordpress/element";
import { AppContext } from "../providers/AppContextProvider";

function useApp() {
  const context = useContext(AppContext);

  return {
    ...context,
  };
}

export { useApp };
