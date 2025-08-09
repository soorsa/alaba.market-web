import { useEffect } from "react";
import "./App.css";
import NetworkStatusBar from "./components/general/NetworkStatusBar";
import { Providers } from "./hooks/Providers";
import AllRoutes from "./routes/allRoutes";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <Providers>
      <AllRoutes />
      <NetworkStatusBar />
    </Providers>
  );
}

export default App;
