import { MainNav } from "./components/MainNav/MainNav";
import { PipelinePage } from "./pages/PipelinePage";
import { AppContextProvider } from "./providers/AppContextProvider";
import { PipelineContextProvider } from "./providers/PipelineContextProvider";
import { UserContextProvider } from "./providers/UserContextProvider";

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
          </UserContextProvider>
        </PipelineContextProvider>
      </AppContextProvider>
    </div>
  );
}
export default App;
