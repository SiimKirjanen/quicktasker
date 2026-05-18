import { createRoot } from "@wordpress/element";
import UserPageApp from "./UserPageApp";

const container = document.getElementById("wpqt-public-user-app");
if (container) {
  createRoot(container).render(<UserPageApp />);
}
