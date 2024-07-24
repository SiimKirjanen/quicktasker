const { render } = wp.element;
import App from "./App";
if (document.getElementById("landing-react-app")) {
  render(<App />, document.getElementById("landing-react-app"));
}
