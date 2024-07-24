const { render } = wp.element;
import App from "./App";
if (document.getElementById("users-react-app")) {
  render(<App />, document.getElementById("users-react-app"));
}
