import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { PipelinePage } from "./pages/PipelinePage";
import { AppContextProvider } from "./providers/AppContextProvider";
import { ModalContextProvider } from "./providers/ModalContextProvider";
import { PipelineContextProvider } from "./providers/PipelineContextProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ErrorBoundary>
      <AppContextProvider>
        <PipelineContextProvider>
          <UserContextProvider>
            <ModalContextProvider>
              <PipelinePage />
              <ToastContainer />
            </ModalContextProvider>
          </UserContextProvider>
        </PipelineContextProvider>
      </AppContextProvider>
    </ErrorBoundary>
  );
}
export default App;
