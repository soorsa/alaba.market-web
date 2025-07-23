import "./App.css";
import { Providers } from "./hooks/Providers";
import AllRoutes from "./routes/allRoutes";

function App() {
  return (
    <Providers>
      <AllRoutes />
    </Providers>
  );
}

export default App;
