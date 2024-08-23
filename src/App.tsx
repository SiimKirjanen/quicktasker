import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { AppContextProvider } from "./providers/AppContextProvider";
import { ModalContextProvider } from "./providers/ModalContextProvider";
import { PipelineContextProvider } from "./providers/PipelineContextProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import { ToastContainer } from "react-toastify";
import { useCurrentPage } from "./hooks/useCurrentPage";

function App() {
  const currentPage = useCurrentPage();

  return (
    <ErrorBoundary>
      <AppContextProvider>
        <PipelineContextProvider>
          <UserContextProvider>
            <ModalContextProvider>
              {currentPage}
              <ToastContainer position="bottom-right" />
            </ModalContextProvider>
          </UserContextProvider>
        </PipelineContextProvider>
      </AppContextProvider>
    </ErrorBoundary>
  );
}

export default App;
