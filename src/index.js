import { createRoot } from "@wordpress/element";
import App from "./App";

const container = document.getElementById("wpqt-app");
if (container) {
  createRoot(container).render(<App />);
}
