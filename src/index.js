const { render } = wp.element;
import App from "./App";
if (document.getElementById("wpqt-app")) {
  render(<App />, document.getElementById("wpqt-app"));
}
