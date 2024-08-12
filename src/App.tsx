import { MainNav } from "./components/MainNav/MainNav";
import { PipelinePage } from "./pages/PipelinePage";
import { AppContextProvider } from "./providers/AppContextProvider";
import { PipelineContextProvider } from "./providers/PipelineContextProvider";
import { UserContextProvider } from "./providers/UserContextProvider";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <div>
      <AppContextProvider>
        <PipelineContextProvider>
          <UserContextProvider>
            <div>
              <MainNav />
            </div>

            <PipelinePage />
            <ToastContainer />
          </UserContextProvider>
        </PipelineContextProvider>
      </AppContextProvider>
    </div>
  );
}
export default App;
