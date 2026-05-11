import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import { useCurrentPage } from "./hooks/useCurrentPage";
import { AppContextProvider } from "./providers/AppContextProvider";
import { LoadingContextProvider } from "./providers/LoadingContextProvider";
import { MissingContentProvider } from "./providers/MissingContentProvider";
import { ModalContextProvider } from "./providers/ModalContextProvider";
import { NotificationsContextProvider } from "./providers/NotificationsContextProvider";
import { PipelinesContextProvider } from "./providers/PipelinesContextProvider";
import { UserContextProvider } from "./providers/UserContextProvider";

function App() {
  const currentPage = useCurrentPage();

  return (
    <ErrorBoundary>
      <AppContextProvider>
        <UserContextProvider>
          <ModalContextProvider>
            <PipelinesContextProvider>
              <NotificationsContextProvider>
                <LoadingContextProvider>
                  <MissingContentProvider>
                    {currentPage}
                    <ToastContainer
                      position="bottom-right"
                      className="wpqt-z-[999999]"
                    />
                  </MissingContentProvider>
                </LoadingContextProvider>
              </NotificationsContextProvider>
            </PipelinesContextProvider>
          </ModalContextProvider>
        </UserContextProvider>
      </AppContextProvider>
    </ErrorBoundary>
  );
}

export default App;
