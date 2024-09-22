import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { AppContextProvider } from "./providers/AppContextProvider";
import { ModalContextProvider } from "./providers/ModalContextProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import { ToastContainer } from "react-toastify";
import { useCurrentPage } from "./hooks/useCurrentPage";
import { PipelinesContextProvider } from "./providers/PipelinesContextProvider";
import { LoadingContextProvider } from "./providers/LoadingContextProvider";

function App() {
  const currentPage = useCurrentPage();

  return (
    <ErrorBoundary>
      <AppContextProvider>
        <UserContextProvider>
          <ModalContextProvider>
            <PipelinesContextProvider>
              <LoadingContextProvider>{currentPage}</LoadingContextProvider>
              <ToastContainer position="bottom-right" />
            </PipelinesContextProvider>
          </ModalContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </ErrorBoundary>
  );
}

export default App;
